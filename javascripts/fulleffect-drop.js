interact('.draggable')
	.draggable({
	    // enable inertial throwing
	    inertia: true,
	    // keep the element within the area of it's parent
	    restrict: {
	    	restriction: "#building",
	    	endOnly: true,
	    	elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	    },
	    // enable autoScroll
	    autoScroll: true,

	    // call this function on every dragmove event
	    onmove: dragMoveListener,

        snap: {
	    	targets: [
	    	interact.createSnapGrid({x: 30, y: 30})
	    	],
	    	range: Infinity,
	    	relativePoints: [ {x: 0, y: 0}]
    	}
	})

	.resizable({
		preserveAspectRatio: false,
		edges: {left: true, right: true, bottom: true, top: true},
		snap: {
	    	targets: [
	    	interact.createSnapGrid({x: 10, y: 10})
	    	],
	    	range: Infinity,
	    	relativePoints: [ {x: 0, y: 0}]
    	}
	})
	.on('resizemove', function (event) {
		var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0),
		y = (parseFloat(target.getAttribute('data-y')) || 0);

		// updating element'sstyle
		target.style.width = event.rect.width + 'px';
		target.style.height = event.rect.height + 'px';

		//translate when resizing from top or left edge
		x += event.deltaRect.left;
		y += event.deltaRect.top;
		target.style.wwebkitTransform = target.style.transform = 'translate('+ x + 'px,' + y + 'px)';

		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		// target.textContent = Math.round(event.rect.width) + 'x' + Math.round(event.rect.height);	
	});

interact('.dropzone').dropzone({
// Telling the drop zone to only 
//allow draggable classes
	accept: '.draggable',
	overlap: 'pointer' || 'center' || zeroToOne,

// As the item is picked up, a class of 
//drop-active is added to item
	ondropactivate: function (event) {
		event.target.classList.add('drop-active');
		console.log("hi"); //Prints when function called
	},
// As the item is dragged to the drop zone 
//it changes classes.
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
		dropzoneElement = event.target;
		console.log("ondragenter"); //prints when function is called

		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
// Once draggable item has left the area, 
//then this function is called. Classes removed.
	ondragleave: function (event) {
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
		event.relatedTarget.classList.remove('dropped');
		console.log("ondragleave()")
	},
// Once dropped, this class is added to the item.
	ondrop: function (event) {
		event.relatedTarget.classList.add('dropped'); // allows us to change color
		console.log("class changed on drop") //Prints once dropped
	},
	ondropdeactivate: function (event) {
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
		
	}
});

function dragMoveListener (event) {
	var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	    'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
};

//Used to listen to any drags on the pages.
window.dragMoveListener = dragMoveListener;