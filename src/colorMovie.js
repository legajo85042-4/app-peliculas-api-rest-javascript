function getColor(imageElem, ratio){

    const canvas = document.createElement('canvas');

    let width = canvas.width = imageElem.width;
    let height = canvas.height = imageElem.height;

    const context = canvas.getContext('2d');
    context.drawImage(imageElem, 0, 0);

    let data, length;
    let i = -4,count = 0;

    try{
        data = context.getImageData(0,0, width, height);
        length = data.data.length;
    } catch(err){
        console.error(err);
        return{
            R:0,
            G:0,
            B:0
        }
    }
    let R,G,B;
    R = G = B = 0;

    while((i += ratio *4) < length){
        ++count;
        R += data.data[i];
        G += data.data[i + 1];
        B += data.data[i + 2];
    }
    R = ~~(R / (count/1.2));
    G = ~~(G / (count/1.2));
    B = ~~(B / (count/1.2));

    return {
        R,
        G, 
        B
    }
}

const tarjetas = document.querySelectorAll('.card-fillcolor');  // Seleccionamos todas las tarjetas
tarjetas.forEach(tarjeta => {
    const image = tarjeta.querySelector('img');  // Seleccionamos la imagen dentro de cada tarjeta
    const imageUrl = image.src;
    const proxyUrl = `http://localhost:8080/proxy?url=${encodeURIComponent(imageUrl)}`;
    const img = new Image();

    img.crossOrigin = "Anonymous";  // Esto es necesario para trabajar con canvas.
    img.src = proxyUrl;
    img.onload = function() {
        const { R, G, B } = getColor(img, 4);
        
        tarjeta.style.backgroundColor = `rgb(${R},${G},${B})`;
    }
});