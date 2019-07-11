const url = 'https://api.myjson.com/bins/152f9j';
var indexTen = 0;
var index = 0;
var posts= [];

fetch(url)
.then(res => res.json())
.then(data => {
    posts = data.data;
    //return rawData/*(post => {
        /* all needed data is listed below as an entity 
            let createdAt = post.createdAt;
            description = post.description;
            img = post.image;
            tags = post.tags;
            title = post.title;
           */
        //});

    posts.sort(sortNewestFirst);
    addTenPosts();
})
.catch((error) => {
    console.log(JSON.stringify(error));
});

/* Adding 10 Posts */
function addTenPosts() {
    for (i=(indexTen*10); i < (indexTen+1)*10;i++) {
        if (posts[i] != null)  
        displayedPosts(posts[i]);
    }
    indexTen++;
}


function displayedPosts(post) {
    /* Div */
    var divMain = document.createElement('div');
    divMain.className = 'post';
    document.getElementsByTagName('main')[0].appendChild(divMain);
    /* Image */
    var image = document.createElement('img');
    image.className = 'img';
    image.src = post.image;
    image.alt = post.title;
    divMain.appendChild(image);
    /* Div */
    var div = document.createElement('div');
    div.className = 'post-text';
    divMain.appendChild(div);
    /* Title */
    var h1 = document.createElement('h1');
    h1.className = 'title';
    h1.innerText = post.title;
    div.appendChild(h1);
    /* Date */
    var date = document.createElement('span');
    date.className = 'date';
    dateUTC = new Date(post.createdAt);
    date.innerText = dateUTC.toUTCString();
    div.appendChild(date);
    /* Tags */
    var tag_list = document.createElement('ul');
    tag_list.className = 'tag-list';
    div.appendChild(tag_list);
    post.tags.forEach(function(item, index, tags) {
        var tag = document.createElement('li');
        tag.className = 'tag';
        tag.innerText = tags[index];
        tag_list.appendChild(tag);
    });
    /* Description */
    var descr = document.createElement('p');
    descr.className = 'description';
    descr.innerText = post.description;
    div.appendChild(descr);
    /* Remove */
    var removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.onclick = function() {
        divMain.parentNode.removeChild(divMain);
        for (i=0; i < posts.length; i++) {
            if (posts[i].title == post.title) 
            posts.splice(i, 1);
        }
    };
    divMain.appendChild(removeButton);
}

/* Loading new 10 posts */
window.addEventListener('scroll', function() {
    if (document.body.scrollHeight - window.pageYOffset <= window.innerHeight + 400) {
            addTenPosts();
        }
});

/* Shows only 10 posts again */
initial_state.onclick = rewritePosts;

function rewritePosts() {
    var elem = document.getElementsByClassName('post');
    while(elem.length > 0){
        elem[0].parentNode.removeChild(elem[0]);
    }
    indexTen = 0;
    addTenPosts();
}

/* Sort by date */
sort_by_date.onchange = function(){
    var value = document.getElementById('sort_by_date');
    if (value.options[value.selectedIndex].value == 'newest') {
        posts.sort(sortNewestFirst);
    }
    if (value.options[value.selectedIndex].value == 'oldest') {
        posts.sort(sortOldestFirst);
    }
    rewritePosts();
}

function sortNewestFirst(a, b) {
    var date1 = new Date(a.createdAt);
    var date2 = new Date(b.createdAt);
    return date2 - date1;
}

function sortOldestFirst(a, b) {
    var date1 = new Date(a.createdAt);
    var date2 = new Date(b.createdAt);
    return date1 - date2;
}

