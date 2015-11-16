// target elements with the "draggable" class
interact('.draggable')
	.draggable({
	    // enable inertial throwing
	    inertia: true,
	    // keep the element within the area of it's parent
	    restrict: {
	    	restriction: "parent",
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
	});

//Practice with resiziing, draggin, and snapping.
interact('.redrag')
	.draggable({
		onmove: window.dragMoveListener,
		endOnly: true,
	    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
		restrict: {
			restriction: 'parent',
		},
		snap: {
	    	targets: [
	    	interact.createSnapGrid({x: 10, y: 10})
	    	],
	    	range: Infinity,
	    	relativePoints: [ {x: 0, y: 0}]
    	}
	})

	.resizable({
		preserveAspectRatio: true,
		edges: {left: true, right: true, bottom: true, top: true},
		invert: 'reposition',
		snap: {
	    	targets: [
	    	interact.createSnapGrid({x: 30, y: 30})
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

//Practice on drag zone, snapping, resizing and draggin.
interact('.dropzone').dropzone({
	accept: '.dropzone',
	overlap: 'pointer',

	ondropactivate: function (event) {
		event.target.classList.add('drop-active');
	},
	onragenter: function (event) {
		var draggableElement = event.relatedTarget,
		dropzoneElement = event.target;

		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
	ondragleave: function (event) {
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	};
	ondrop: function (event) {
		event.relatedTarget.classList.add('dropped');
	},
	ondropdeactive: function (event) {
		event.target.classList.remove('dro-active');
		event.target.classList.remove('drop-target');
		event.taget.classList.remove('dropped');
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
}

//Used to listen to any drags on the pages.
window.dragMoveListener = dragMoveListener;

