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
    AddTenPosts();
})
.catch((error) => {
    console.log(JSON.stringify(error));
});

function AddTenPosts()
{
    for (i=(indexTen*10); i < (indexTen+1)*10;i++)
    {
        if (posts[i] != null)  
        displayedPosts(posts[i]);
    }
    indexTen++;
}

function displayedPosts(post) {
    /* Div */
    var div = document.createElement('div');
    div.className = 'post';
    document.getElementsByTagName('main')[0].appendChild(div);
    /* Image */
    var image = document.createElement('img');
    image.className = 'img';
    image.src = post.image;
    image.alt = post.title;
    div.appendChild(image);
    /* Title */
    var h1 = document.createElement('h1');
    h1.className = 'title';
    h1.innerText = post.title;
    div.appendChild(h1);
    /* Date */
    var date = document.createElement('date');
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
    var remove = document.createElement('button');
    remove.className = 'remove';
    div.appendChild(remove);
}

window.addEventListener('scroll', function() {
    if (document.body.scrollHeight - window.pageYOffset <= window.innerHeight + 200)
        {
            AddTenPosts();
        }
});


initial_state.onclick = function() {
    var elem = document.getElementsByClassName('post');
    while(elem.length > 0){
        elem[0].parentNode.removeChild(elem[0]);
    }
    indexTen = 0;
    AddTenPosts();
}