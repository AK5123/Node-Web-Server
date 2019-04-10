var b=document.querySelector("button");
var c=document.querySelector("input");
var p1=document.createElement("p");
document.querySelector("div").appendChild(p1);
b.addEventListener("click",(e)=>{
    e.preventDefault();

    fetch("/weather?search="+c.value).then((data)=>{
    data.json().then((parsed)=>{
            p1.textContent = p1.textContent + parsed.content;
        
    })

})
    
});

