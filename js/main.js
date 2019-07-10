const url = 'https://api.myjson.com/bins/152f9j';
var index = 0;
fetch(url)
    .then(res => res.json())
    .then(data => {
        const rawData = data.data;
        return rawData.map(post => {
            /* all needed data is listed below as an entity */ 
            let createdAt = post.createdAt;
                description = post.description;
                img = post.image;
                tags = post.tags;
                title = post.title;
            
            /* Div */
            var div = document.createElement('div');
            div.className = 'post';
            document.getElementsByTagName('main')[0].appendChild(div);
            /* Image */
            var image = document.createElement('img');
            image.className = 'img';
            image.src = post['image'];
            image.alt = post['title'];
            div.appendChild(image);
            /* Title */
            var h1 = document.createElement('h1');
            h1.className = 'title';
            h1.innerText = title;
            div.appendChild(h1);
            /* Date */
            var date = document.createElement('date');
            date.className = 'date';
            date.innerText = createdAt;
            div.appendChild(date);
            /* Tags */
            var tag_list = document.createElement('ul')
            tag_list.className = 'tag-list';
            div.appendChild(tag_list);
            tags.forEach(function(item, index, tags) {
                var tag = document.createElement('li');
                tag.className = 'tag';
                tag.innerText = tags[index];
                tag_list.appendChild(tag);
            });
            /* Description */
            var descr = document.createElement('p');
            descr.className = 'description';
            descr.innerText = description;
            div.appendChild(descr);
        });
    })
    .catch((error) => {
        console.log(JSON.stringify(error));
    });
