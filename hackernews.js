if (hnLoaded) {
    return;
}
var hnLoaded = true;
var imgs = document.getElementsByTagName('img');
var comments = [];
var commentcount = 0;
var doCollapse;

function handleComment(commentindex, isRoot) {
    var comment = comments[commentindex]['node'].getElementsByTagName('span');
	var p = comments[commentindex]['node'].getElementsByTagName('p')[0];

	for (i in comment) {
		if (comment[i].getAttribute('class') == 'comment') {
			comment = comment[i];
			break;
		}
	}
    
	if (isRoot) {
		if (comment.style.display == 'none') {
			doCollapse = false;
	        comment.style.display = 'block';
		    p.style.display = 'block';
	    } else {
			doCollapse = true;
	        comment.style.display = 'none';
			p.style.display = 'none';
	    }
	} else {
		if (doCollapse) {
	        comments[commentindex]['node'].style.display = 'none';
			comment.style.display = 'none';
			p.style.display = 'none';
	    } else {
	        comments[commentindex]['node'].style.display = 'block';
			comment.style.display = 'block';
			p.style.display = 'block';
	    }
	}


    for (var i in comments[commentindex]['children']) {
        handleComment(comments[commentindex]['children'][i], false);
    }
}

/* Store current parent at level*/
var parent = {};

for (i in imgs) {
    if (imgs[i].getAttribute('src') == 'http://ycombinator.com/images/s.gif') {
        var width = imgs[i].getAttribute('width');
        var depth = (parseInt(width)/40);
        if (depth % 1 == 0 ) {
            comments[commentcount] = {};
            comments[commentcount]['node'] = imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            imgs[i].parentNode.parentNode.childNodes[2].childNodes[0].innerHTML += ' <a href="javascript:handleComment('+commentcount+', true)">(toggle comments)</a>';
            /*comments[commentcount]['node'].style.display = 'none';*/
            comments[commentcount]['depth'] = depth;
            comments[commentcount]['children'] = [];
            
			parent[depth] = comments[commentcount];

			if (depth > 0) {
            	parent[depth - 1]['children'].push(commentcount);
            }
            commentcount +=1;
        }
    }
}
