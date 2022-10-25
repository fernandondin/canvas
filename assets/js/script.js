const paintCanvas = document.querySelector( '.js-paint' );
  
  const context = paintCanvas.getContext( '2d' );
  context.lineCap = 'round';

  const paintCanvas1 = document.querySelector( '#js' );
  const context1 = paintCanvas1.getContext( '2d' );
  context1.lineCap = 'round';
  context1.globalCompositeOperation = 'destination-atop';
  
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

  paintCanvas1.addEventListener( 'mousedown', startDrawing );
  paintCanvas1.addEventListener( 'mousemove', drawLine );
  paintCanvas1.addEventListener( 'mouseup', stopDrawing );
  paintCanvas1.addEventListener( 'mouseout', stopDrawing );

 const borrarCanvasButton = document.querySelector('#borrar')
 borrarCanvasButton.addEventListener('click', procesarClickBorrar)