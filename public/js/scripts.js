$(()=>{
    const url = "http://localhost:3333/product";
    let container = $('#mydiv');


    container.click(
    function(event) {
            if(event.target.id.slice(0,3) === "btn"){
                let idn = event.target.id.slice(-8);
                let igf = "form" + event.target.id.slice(-8);
                let idForm = $("#" + igf);
                if(!idForm[0].checkValidity()){
                    $('<input type="submit">').hide().appendTo(idForm).click().remove();
                    return;
                }
                event.preventDefault();
                const name = $("#name" + idn).val();
                const description = $('#description' + idn).val();
                const id = $('#' + idn).val();
                const price = $('#price' + idn).val();
                let data = {
                    name: name,
                    description: description,
                    id: id,
                    price: price
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
                }).then(() =>{
                    container.empty();
                    getMessages();
                })
            }else{
                event.preventDefault();
            }
        }
    );
    getMessages = () => {
        $.ajax({
            method: "GET",
            url: url
        }).then((response)=>{
            for(i=0;i<response.length; i++){
                let form = $(`<form method="post" id='form${response[i].id}' action="">`);
                let div_name = $(`<div class="form-group">`);
                let label_name = $(`<label for='name${response[i].id}'>name</label>`);
                let input_name =$(`<input type="text" class="form-control" id='name${response[i].id}' name="name" value='${response[i].name}' required>`);
                div_name.append(label_name,input_name);
                let div_description = $(`<div class="form-group">`);
                let label_description = $(`<label for='description${response[i].id}'>description</label>`);
                let input_description =$(`<input type="text" class="form-control" id='description${response[i].id}'  name="description" value='${response[i].description}' required>`);
                div_description.append(label_description,input_description);
                let div_price = $(`<div class="form-group">`);
                let label_price = $(`<label for='price${response[i].id}'>price</label>`);
                let input_price =$(`<input type="number" class="form-control" id='price${response[i].id}' name="price" value='${response[i].price}' required>`);
                div_price.append(label_price,input_price);
                let div_id = $(`<div class="form-group">`);
                let input_id =$(`<input type="hidden" class="form-control" id='${response[i].id}' name="id" value='${response[i].id}'>`);
                div_id.append(input_id);
                let div = $(`<div style="overflow: hidden; padding-right: .5em;">`);
                let button =$(`<input type="submit" id='btn${response[i].id}' class="btn btn-primary" value="save changes">`);
                div.append(button);
                form.append(div_name,div_description,div_id,div_price,div);
                container.prepend(form);
                if(response[i].image){
                    let div_img1 = $(`<div>`);
                    let img = $(`<img class="preview_image" src='http://localhost:3333/uploads/${response[i].image}' alt="">`);
                    div_img1.append(img);
                    container.prepend(div_img1);
                }
            }
        });
    };

    getMessages();

    $("#btn").on('click',(e)=>{
        let idForm = $("#ajax_form");
        if(!idForm[0].checkValidity()){
            $('<input type="submit">').hide().appendTo(idForm).click().remove();
            return;
        }
        e.preventDefault();
        const data = new FormData(document.getElementById("ajax_form"));
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            contentType: false,
            processData: false
        }).then((response) =>{
            let form = $(`<form method="post" id='form${response.id}' action="">`);
            let div_name = $(`<div class="form-group">`);
            let label_name = $(`<label for='name${response.id}'>name</label>`);
            let input_name =$(`<input type="text" class="form-control" id='name${response.id}' name="name" value='${response.name}' required>`);
            div_name.append(label_name,input_name);
            let div_description = $(`<div class="form-group">`);
            let label_description = $(`<label for='description${response.id}'>description</label>`);
            let input_description =$(`<input type="text" class="form-control" value='${response.description}' id='description${response.id}'  name="description" value='${response.description}' required>`);
            div_description.append(label_description,input_description);
            let div_price = $(`<div class="form-group">`);
            let label_price = $(`<label for='price${response.id}'>price</label>`);
            let input_price =$(`<input type="number" class="form-control" id='price${response.id}' name="price" value='${response.price}' required>`);
            div_price.append(label_price,input_price);
            let div_id = $(`<div class="form-group">`);
            let input_id =$(`<input type="hidden" class="form-control" id='${response.id}' name="id" value='${response.id}'>`);
            div_id.append(input_id);
            let div = $(`<div style="overflow: hidden; padding-right: .5em;">`);
            let button =$(`<input type="submit" id='btn${response.id}' class="btn btn-primary" value="save changes">`);
            div.append(button);
            form.append(div_name,div_description,div_id,div_price,div);
            container.prepend(form);
            if(response.image){
                let div_img1 = $(`<div>`);
                let img =$(`<img class="preview_image" src='http://localhost:3333/uploads/${response.image}' alt="">`);
                div_img1.append(img);
                container.prepend(div_img1);
            }
        })
    })
});
