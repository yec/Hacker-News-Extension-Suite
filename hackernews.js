var imgs = document.getElementsByTagName('img');
var comments = [];
var commentcount = 0;

function handleComment(commentindex) {
    if (comments[commentindex]['node'].style.display == 'none') {
        comments[commentindex]['node'].style.display = 'block';
    } else {
        comments[commentindex]['node'].style.display = 'none';
        for (var i in comments[commentindex]['children']) {
            handleComment(comments[commentindex]['children'][i]);
        }
    }
}

var title = document.getElementsByTagName('td');
for (i in title) {
    if (title[i].getAttribute('class') == 'title') {
        title = title[i];
        break;
    }
}

for (i in imgs) {
    if (imgs[i].getAttribute('src') == 'http://ycombinator.com/images/s.gif') {
        var width = imgs[i].getAttribute('width');
        var depth = (parseInt(width)/40);
        if (depth % 1 == 0 ) {
            title.innerHTML += (parseInt(width)/40) + "<br />";
            comments[commentcount] = {};
            comments[commentcount]['node'] = imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            imgs[i].parentNode.parentNode.childNodes[2].childNodes[0].innerHTML += ' <a href="javascript:handleComment('+commentcount+')">(toggle comments)</a>';
            /*comments[commentcount]['node'].style.display = 'none';*/
            comments[commentcount]['depth'] = depth;
            comments[commentcount]['children'] = [];
            if (commentcount > 0) {
                if (depth > comments[commentcount - 1]['depth']) {
                    title.innerHTML += 'deeper' + "<br />";
                    comments[commentcount-1]['children'].push(commentcount);
                } else if(depth > comments[commentcount - 1]['depth']) { 
                    title.innerHTML += 'less' + "<br />";
                } else {
                    title.innerHTML += 'same' + "<br />";
                }
            }
            commentcount +=1;
        }
    }
}
