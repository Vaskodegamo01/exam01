$(()=>{
    const url = "http://localhost:8000/messages";
    let container = $('<div>');
    getMessages = () => {
        $.ajax({
            method: "GET",
            url: url
        }).then((response)=>{
            $('body').append(container);
            for(i=0;i<response.length; i++){
                let div = $('<div id ="mess">');
                let p =$('<p>').text(response[i].author);
                let b =$('<b>').text(response[i].message);
                div.append(p,b);
                container.prepend(div);
            }
        });
    };

    getMessages();

    $("#send").on('click',()=>{
        const message = $('#massage').val();
        const author = $('#name').val();
        let data = {
            author: author,
            message: message
        };
        $.ajax({
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: false,
            processData: false,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
            }
        }).then((response) =>{
            let div = $('<div id ="mess">');
            let p =$('<p>').text(response.author);
            let b =$('<b>').text(response.message);
            div.append(p,b);
            container.prepend(div);
        })
    })
})