$(()=>{
    const url = "http://localhost:3333/product";
    let container = $('#mydiv');


    $("#mydiv").click(
        function(event) {
            let id = "form" + event.target.id.slice(-8);
            event.preventDefault();
            let idForm = $("#" + id);
            if (!idForm[0].checkValidity()) {
                $('<input type="submit">').hide().appendTo(idForm).click().remove();
                return;
            }
            e.preventDefault();
            const data = new FormData(document.getElementById("id"));
            $.ajax({
                method: "POST",
                url: url,
                data: data,
                contentType: false,
                processData: false
            })
        });

    getMessages = () => {
        $.ajax({
            method: "GET",
            url: url
        }).then((response)=>{
            for(i=0;i<response.length; i++){
                let form = $(`<form method="post" id='form${response[i].id}' action="">`);
                let div_name = $(`<div class="form-group">`);
                let label_name = $(`<label for='name${response[i].id}'>name</label>`);
                let input_name =$(`<input type="text" class="form-control" id='name${response[i].id}' name="name" value='${response[i].name}'>`);
                div_name.append(label_name,input_name);
                let div_description = $(`<div class="form-group">`);
                let label_description = $(`<label for='description${response[i].id}'>description</label>`);
                let input_description =$(`<textarea class="form-control" rows="2" placeholder='${response[i].description}' id='description${response[i].id}'  name="description">`);
                div_description.append(label_description,input_description);
                let div_price = $(`<div class="form-group">`);
                let label_price = $(`<label for='price${response[i].id}'>price</label>`);
                let input_price =$(`<input type="number" class="form-control" id='price${response[i].id}' name="price" value='${response[i].price}'>`);
                div_price.append(label_price,input_price);
                let div_image = $(`<div class="form-group">`);
                let label_image = $(`<label for='image${response[i].id}'>image</label>`);
                let input_image =$(`<input type="file" class="form-control" id='image${response[i].id}' name="image" value='${response[i].image}'>`);
                div_image.append(label_image,input_image);
                let div = $(`<div style="overflow: hidden; padding-right: .5em;">`);
                let button =$(`<input type="submit" id='btn${response[i].id}' class="btn btn-primary" value="save changes">`);
                div.append(button);
                form.append(div_name,div_description,div_price,div_image,div);
                container.prepend(form);
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
            let input_name =$(`<input type="text" class="form-control" id='name${response.id}' name="name" value='${response.name}'>`);
            div_name.append(label_name,input_name);
            let div_description = $(`<div class="form-group">`);
            let label_description = $(`<label for='description${response.id}'>description</label>`);
            let input_description =$(`<textarea class="form-control" rows="2" placeholder='${response.description}' id='description${response.id}'  name="description">`);
            div_description.append(label_description,input_description);
            let div_price = $(`<div class="form-group">`);
            let label_price = $(`<label for='price${response.id}'>price</label>`);
            let input_price =$(`<input type="number" class="form-control" id='price${response.id}' name="price" value='${response.price}'>`);
            div_price.append(label_price,input_price);
            let div_image = $(`<div class="form-group">`);
            let label_image = $(`<label for='image${response.id}'>image</label>`);
            let input_image =$(`<input type="file" class="form-control" id='image${response.id}' name="image" value='${response.image}'>`);
            div_image.append(label_image,input_image);
            let div = $(`<div style="overflow: hidden; padding-right: .5em;">`);
            let button =$(`<input type="submit" id='btn${response.id}' class="btn btn-primary" value="save changes">`);
            div.append(button);
            form.append(div_name,div_description,div_price,div_image,div);
            container.prepend(form);
        })
    })
});
