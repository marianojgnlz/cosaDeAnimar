class Nodo{
    constructor(valor){
        this.valor = valor   
    }
}
class UI{
    crearNodo(nodo){
        if (nodo.valor > -1 && nodo.valor < 10) {
            const $conteinerNodes = document.querySelector('#conteinerNodes');
            $conteinerNodes.innerHTML = $conteinerNodes.innerHTML + `
            <div id="nodo" class="bg-info d-inline-block position-relative animated bounce">
                <div id="conteinerNodo" class="d-inline-block">
                    <p id="valorNodo" class="position-absolute mb-0 h3">${nodo.valor}</p>
                </div>
            </div>
        `
        this.crearArrow();
        }else{
            const $valueNodo = document.querySelector('#valueNodo');
            $valueNodo.className ='error-border ' + $valueNodo.className;
            this.showError('Valor no permitido')
        }
    }
    crearArrow(){
        const $conteinerNodes = document.querySelector('#conteinerNodes');
        $conteinerNodes.innerHTML = $conteinerNodes.innerHTML + `
        <div id="containerArrow" class="animacion d-inline-block position-relative">
            <div id="arrow"></div>
        </div>
        `
    }
    crearNodoAntes(nodo,posicion){
        const $divNodo = document.createElement('div');
        $divNodo.id = 'nodo';
        $divNodo.className = 'bg-info d-inline-block position-relative';
        $divNodo.innerHTML = `
            <div id="conteinerNodo" class="d-inline-block">
                    <p id="valorNodo" class="position-absolute mb-0 h3">${nodo.valor}</p>
                </div>
        `
        const $nodosActuales = document.querySelectorAll('#nodo');
        const $conteinerNodes = document.querySelector('#conteinerNodes');
        $conteinerNodes.insertBefore($divNodo,$nodosActuales[posicion-1]);
        this.crearArrowAntes(posicion);
    }
    crearArrowAntes(posicion){
        const $newArrow = document.createElement('div');
        $newArrow.id = 'containerArrow';
        $newArrow.className = 'animacion d-inline-block position-relative';
        $newArrow.innerHTML = `<div id="arrow"></div>`;
        const $nodosActuales = document.querySelectorAll('#nodo');
        const $conteinerNodes = document.querySelector('#conteinerNodes');
        $conteinerNodes.insertBefore($newArrow,$nodosActuales[posicion]);
    }
    showError(error){
        const $navBar = document.querySelector('#navbar');
        const $cite = document.querySelector('#cite');
        const $divError = document.createElement('div');
        $divError.innerText = error;
        $divError.className = 'error alert alert-danger w-50 h6';
        $divError.role = 'alert'
        $navBar.insertBefore($divError,$cite);
    }
    deleteError(){
        document.querySelector('.error').remove();
        const $inputs = document.querySelectorAll("input[name='value']");
        $inputs.forEach(input => input.className = 'col');
    }
}


const $create = document.querySelector('#create-input');

$create.onclick = function(){
    const ui = new UI();
    if (document.querySelector('.error')){ 
       ui.deleteError()
    }
    const $valueNodo = document.querySelector('#valueNodo');
    if ($valueNodo.value === '') {
        const $valueNodo = document.querySelector('#valueNodo');
        $valueNodo.className ='error-border ' + $valueNodo.className;
        ui.showError('Error, el campo Valor no puede estar vacío')
    }else{
        const nodo = new Nodo($valueNodo.value);
        let $valorPosicion = document.querySelector('#valorPosicion');
        if ($valorPosicion.value === '') {
            ui.crearNodo(nodo); 
        } else {
            const posicion = document.querySelector('#valorPosicion').value;
            ui.crearNodoAntes(nodo,posicion);
        }
    }
}

const $valueNodo = document.querySelector("#valueNodo");
$valueNodo.onclick = function(){
    if (document.querySelector('.error')){
        const ui = new UI();
        ui.deleteError()
    }
}

const $positionNodo = document.querySelector("#positionNodo");
$positionNodo.onclick = function(){
    if (document.querySelector('.error')){
        const ui = new UI();
        ui.deleteError()
    }
}


const $deleteNodo = document.querySelector('#delete-nodo');
$deleteNodo.onclick = function(){
    const ui = new UI();
    if (document.querySelector('.error')){
        ui.deleteError()
     }
    const $positionNode = document.querySelector('#positionNodo');
    const $allNodes = document.querySelectorAll('#nodo');
    const $allArrows = document.querySelectorAll('#containerArrow');
    if (document.querySelector("#checkBox").checked) {
        $allArrows.forEach(arrow => arrow.remove());
        $allNodes.forEach(nodo => nodo.remove())
    } else if ($positionNode.value) {
        if (($allNodes.length && $positionNode.value-1 >= 0)&&($allNodes.length > $positionNode.value-1 )){
            $allArrows[$positionNode.value-1].remove();
            $allNodes[$positionNode.value-1].remove();
        } else {
            $positionNode.className ='error-border ' + $positionNode.className;
            ui.showError('No existe la posicion solicitada');
        }
    }
}

function intercambio(uno,dos){
    const $nodoUno = document.querySelectorAll('#nodo')[uno-1];
    const $nodoDos = document.querySelectorAll('#nodo')[dos-1];

    $nodoUno.classList.add('intercambio');
    $nodoDos.classList.add('intercambioInverso');

    setTimeout(function(){
        let resguardo = $nodoUno.firstElementChild.innerHTML;
        $nodoUno.firstElementChild.innerHTML = $nodoDos.firstElementChild.innerHTML;
        $nodoDos.firstElementChild.innerHTML = resguardo;
        $nodoUno.classList.remove('intercambio');
        $nodoDos.classList.remove('intercambioInverso');
    },4000)
}

const $quickSort = document.querySelector('#quick-sort');

$quickSort.onclick = function(){
    const $allP = document.querySelectorAll('#valorNodo');
    let $allValues = [];
    $allP.forEach(p => $allValues.push(Number(p.innerText)));
    
    $allValues = quickSort($allValues);

    const $allNodes = document.querySelectorAll('#nodo');
    const $allArrows = document.querySelectorAll('#containerArrow');

    $allNodes.forEach(div => div.remove());
    $allArrows.forEach(div => div.remove());

    const ui = new UI();

    $allValues.forEach(value => ui.crearNodo(new Nodo(value)))

}