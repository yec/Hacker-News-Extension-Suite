var imgs = document.getElementsByTagName('img');
var comments = [];
var commentcount = 0;

function handleComment(commentindex) {
    var comment = comments[commentindex]['node'].getElementsByTagName('span');
	
	for (i in comment) {
		if (comment[i].getAttribute('class') == 'comment') {
			comment = comment[i];
			break;
		}
	}
    
	if (comment.style.display == 'none') {
        comment.style.display = 'block';
    } else {
        comment.style.display = 'none';
    }
    for (var i in comments[commentindex]['children']) {
        handleComment(comments[commentindex]['children'][i]);
    }
}

var title = document.getElementsByTagName('td');
for (i in title) {
    if (title[i].getAttribute('class') == 'title') {
        title = title[i];
        break;
    }
}

/* Store current parent at level*/
var parent = {};

for (i in imgs) {
    if (imgs[i].getAttribute('src') == 'http://ycombinator.com/images/s.gif') {
        var width = imgs[i].getAttribute('width');
        var depth = (parseInt(width)/40);
        if (depth % 1 == 0 ) {
            title.innerHTML += '<br />' + (parseInt(width)/40);
            comments[commentcount] = {};
            comments[commentcount]['node'] = imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            imgs[i].parentNode.parentNode.childNodes[2].childNodes[0].innerHTML += ' <a href="javascript:handleComment('+commentcount+')">(toggle comments)</a>';
            /*comments[commentcount]['node'].style.display = 'none';*/
            comments[commentcount]['depth'] = depth;
            comments[commentcount]['children'] = [];
            
			parent[depth] = comments[commentcount];

			if (commentcount > 0) {
            	parent[depth - 1]['children'].push(commentcount);
            }
            commentcount +=1;
        }
    }
}