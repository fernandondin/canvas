  let x = 0, y = 0;
  let isMouseDown = false;

  const stopDrawing = () => { isMouseDown = false; }
  const startDrawing = event => {
      isMouseDown = true;   
     [x, y] = [event.offsetX, event.offsetY];  
  }
  const drawLine = event => {
      if ( isMouseDown ) {
          const newX = event.offsetX;
          const newY = event.offsetY;
          context.beginPath();
          context.moveTo( x, y );
          context.lineTo( newX, newY );
          context.stroke();
          //[x, y] = [newX, newY];
          x = newX;
          y = newY;
      }
  }
  const header = document.querySelector('header');
  const paintCanvas = document.querySelector( '#js-paint' );
  const canv = document.querySelector( '.canv' );
  const tools = document.querySelector('.tools');

  header.width = document.documentElement.clientWidth;
  canv.width = document.documentElement.clientWidth;
  canv.height = document.documentElement.clientHeight - header.clientHeight - tools.clientHeight - 20;
  paintCanvas.width = document.documentElement.clientWidth;
  paintCanvas.height = document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
  
  const context = paintCanvas.getContext( '2d' );
  context.lineCap = 'round';

  const paintCanvas1 = document.querySelector( '#js' );
  paintCanvas1.width= document.documentElement.clientWidth;
  paintCanvas1.height= document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
  paintCanvas1.addEventListener( 'mousedown', startDrawing ); 
  const context1 = paintCanvas1.getContext( '2d' );
  context1.lineCap = 'round';
  context1.globalCompositeOperation = 'destination-atop';

  const paintCanvas2 = document.querySelector( '#ejez' );
  paintCanvas2.width= document.documentElement.clientWidth;
  paintCanvas2.height= document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
  const context2 = paintCanvas2.getContext( '2d' );
  context2.lineCap = 'round';
  for(i=0;i<paintCanvas2.width;i+=50){
    context2.beginPath();
    context2.moveTo( i, 0);
    context2.lineTo( i, paintCanvas2.clientHeight); 
    context2.stroke();
  }
  for(i=0;i<paintCanvas2.height;i+=50){
    context2.beginPath();
    context2.moveTo( 0, i);
    context2.lineTo( paintCanvas2.clientWidth,i); 
    context2.stroke();
  }

  window.addEventListener('resize', function(event){
    canv.width = document.documentElement.clientWidth;
    canv.height = document.documentElement.clientHeight - header.clientHeight - tools.clientHeight - 20;
    paintCanvas.width = document.documentElement.clientWidth;
    paintCanvas.height = document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
    paintCanvas1.width= document.documentElement.clientWidth;
    paintCanvas1.height= document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
    paintCanvas2.width= document.documentElement.clientWidth;
    paintCanvas2.height= document.documentElement.clientHeight - header.clientHeight - tools.clientHeight -20;
    context1.globalCompositeOperation = 'destination-atop';
    context2.clearRect(0, 0, paintCanvas2.clientWidth, paintCanvas2.clientHeight);
    for(i=0;i<paintCanvas2.width;i+=50){
      context2.beginPath();
      context2.moveTo( i, 0);
      context2.lineTo( i, paintCanvas2.clientHeight); 
      context2.stroke();
    }
    for(j=0;j<paintCanvas2.height;j+=50){
      context2.beginPath();
      context2.moveTo( 0, j);
      context2.lineTo( paintCanvas2.clientWidth,j); 
      context2.stroke();
    }  
    context.lineCap = 'round';
  });
  
  paintCanvas1.addEventListener('mousemove', (e) => {
    let size = lineWidthRange.value;
    context1.beginPath();
    context1.arc(e.offsetX, e.offsetY, size, 0, Math.PI * 2);
    context1.strokeStyle = colorPicker.value;
    context1.stroke();
  });

  
  const procesarClickBorrar = function (event) {
    context.clearRect(0, 0, paintCanvas.clientWidth, paintCanvas.clientHeight);
    
  }

  const goma = document.querySelector('#goma');

  goma.addEventListener('change', function (event) {
    if (goma.checked) {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
    }
  });



  const colorPicker = document.querySelector( '.js-color-picker');

  const colorListener = function (event) {
    context.strokeStyle = event.target.value;
    console.log(event.target) // <input type="color"  class="js-color-picker  color-picker">
  }

  colorPicker.addEventListener( 'change', colorListener);

  const lineWidthRange = document.querySelector( '.js-line-range' );
  const lineWidthLabel = document.querySelector( '.js-range-value' );


  lineWidthRange.addEventListener( 'input', event => {
      const width = event.target.value;
      lineWidthLabel.innerHTML = width;
      context.lineWidth = width;
  } );


  paintCanvas1.addEventListener( 'mousedown', startDrawing );
  paintCanvas1.addEventListener( 'mousemove', drawLine );
  paintCanvas1.addEventListener( 'mouseup', stopDrawing );
  paintCanvas1.addEventListener( 'mouseout', stopDrawing );

 const borrarCanvasButton = document.querySelector('#borrar')
 borrarCanvasButton.addEventListener('click', procesarClickBorrar)