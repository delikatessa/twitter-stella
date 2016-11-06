function createDot(x, y){
    var elem = document.createElement("div");
    elem.setAttribute("class", "stars");
    elem.setAttribute("style", "left:"+x+"px;top:"+y+"px;");
    document.getElementsByTagName("body")[0].appendChild(elem);
    return elem;
}
//

var Count_Num_Of_Dots = 0;
//
function Add_Dot(){

        if(Count_Num_Of_Dots < 150){

            createDot(Math.floor(Math.random()*1900), Math.floor(Math.random()*870 + 40));
            Count_Num_Of_Dots ++;
            document.getElementById('num_of_dots').value ++;

        }else{// stop timer

            clearInterval(My_Timer_Var);

        }
}
//

// Timer
var My_Timer_Var = setInterval(function(){ Add_Dot() }, .5);
