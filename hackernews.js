javascript:
var spans = document.getElementsByTagName('span');
var comments = [];
var commentcount = 0;

function handleComment(commentindex) {
    if (comments[commentindex].style.display == 'none') {
        comments[commentindex].style.display = 'block';
    } else {
        comments[commentindex].style.display = 'none';
    }
}

for (i in spans) {
    if (spans[i].getAttribute('class') == 'comhead') {
        spans[i].innerHTML += ' <a href="javascript:handleComment('+commentcount+');">(toggle comment)</a>';
    }
    else if (spans[i].getAttribute('class') == 'comment') {
        spans[i].style.display = 'none';
        comments[commentcount] = spans[i];
        commentcount += 1;
    }
}
