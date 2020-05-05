window.onload =  function(){    
    let stage = document.getElementById('stage')
    let ctx = stage.getContext('2d')  
    document.addEventListener('keydown', keyPush)
    
//velocidade c q a cobra vai se movimentar eh ditada pelo setInterval
    setInterval(game, 160)    

    const vel =1, tamanhoCorpoInicial =5   
    let velocidadeX = velocidadeY = 0    
    let pontoX=10    
    let pontoY = 10    
    let tamanhoCadaQuadradoX = 20    
    let tamanhoCadaQuadradoY = 20    
    let quantidadeDeQuadradosX =stage.width/tamanhoCadaQuadradoX    
    let quantidadeDeQuadradosY =stage.height/tamanhoCadaQuadradoY    
    let posicaoInicialMacaX = posicaoInicialMacaY = 15
    let rastro = []    
    let tamanhoDoCorpo = tamanhoCorpoInicial


    function game(){
        pontoX +=velocidadeX
        pontoY += velocidadeY

        if (pontoX<0){
            pontoX = quantidadeDeQuadradosX-1
        }
        if (pontoY<0){
            pontoY = quantidadeDeQuadradosY-1
        }
        if (pontoX> quantidadeDeQuadradosX-1){
            pontoX =0
        }
        if (pontoY> quantidadeDeQuadradosY-1){
            pontoY =0
        }

        ctx.fillStyle = 'black'
        ctx.fillRect(0,0, stage.width, stage.height)

        ctx.fillStyle = 'red'
        ctx.fillRect(
            posicaoInicialMacaX*tamanhoCadaQuadradoX, 
            posicaoInicialMacaY*tamanhoCadaQuadradoY, 
            tamanhoCadaQuadradoX, 
            tamanhoCadaQuadradoY
        )

        ctx.fillStyle = 'gray'
        for (let i=0;i<rastro.length; i++){
            ctx.fillRect(
                rastro[i].x*tamanhoCadaQuadradoX, 
                rastro[i].y*tamanhoCadaQuadradoY, 
                tamanhoCadaQuadradoX-1, 
                tamanhoCadaQuadradoY-1
            )
            if (rastro[i].x ==pontoX && rastro[i].y ==pontoY && tamanhoDoCorpo > tamanhoCorpoInicial){
                velocidadeX=velocidadeY=0
                console.log('game over')
                tamanhoDoCorpo =5
            }            
        }

        rastro.push({x:pontoX, y:pontoY})
        while (rastro.length > tamanhoDoCorpo){
            console.log('entrei')
            //retira a ultima parte da cobra
            rastro.shift()
        }

        if (posicaoInicialMacaX==pontoX && posicaoInicialMacaY==pontoY){
            console.log('comeu a maca')
            tamanhoDoCorpo++
            posicaoInicialMacaX = Math.floor(Math.random()*quantidadeDeQuadradosX)
            posicaoInicialMacaY = Math.floor(Math.random()*quantidadeDeQuadradosY)
        }


    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: //left
                velocidadeX = -vel
                velocidadeY=0
                break
            case 38: //up
                velocidadeX = 0
                velocidadeY=-vel
                break
            case 39: //right
                velocidadeX = vel
                velocidadeY=0
                break
            case 40: //down
                velocidadeX = 0
                velocidadeY=vel
                break            
            default:
                break
        }
    }



}