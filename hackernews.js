var imgs = document.getElementsByTagName('img');
var comments = [];
var commentcount = 0;

function handleComment(commentindex) {
    if (comments[commentindex].style.display == 'none') {
        comments[commentindex].style.display = 'block';
    } else {
        comments[commentindex].style.display = 'none';
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
        if (depth % 1 == 0 && depth > 0) {
            title.innerHTML += (parseInt(width)/40) + "<br />";
            comments[commentcount].node = imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            commentcount +=1;
        }
    }
}
