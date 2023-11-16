$(document).ready(function() {

    //  var binanceme = new WebSocket('wss://stream.binance.me:443/ws/btcusdt@ticker');

    // binanceme.onmessage = (event) => {


    //     // addspan.removeChild(addspan.firstElementChild);
    //     let stockObject = JSON.parse(event.data);

    //     console.log(stockObject);
    //     // if (event) {
    //     //     console.log('ada');
    //     // } else {
    //     //     console.log('kosong');
    //     // }
        
    // }
    function toCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function peringatan(value) {
        // var persen = (value*10)/100;
        var data= parseFloat(value).toFixed(0)
        // console.log(value);
        if (data >= 34500) {
            // alert('naik 10% lebih');
            // return false;
            console.log('Naik Lagi');
        } else if(data <= 34000) {
            console.log('waktunya beli');
            // alert('turun 10% lebih');
        }

    }

    function template() {
        let feeBinance = 0.1;
       
        let statusavg = null;
        let pfPresentase = null;
        let statusfortable = null;
        let ticker = null;
        let trade = null;

        let lasttrade = null;
       
            var ws = new WebSocket('wss://stream.binance.me:443/ws/btcusdt@miniTicker/btcusdt@ticker');
            ws.onmessage = (event) => {
                let stockObject = JSON.parse(event.data);
                if (stockObject.e === '24hrMiniTicker') {
                    trade = stockObject.c;
                } else {
                    ticker = stockObject.P;
                }
                mtElement = document.getElementById("mt");
                if (mtElement !== null) {
                    mtElement.style.color = ticker < 0 ? 'red' : 'green';
                    mtElement.innerText = parseFloat(ticker).toFixed(2) + "%";
                }else{
                    mtElement.innerText = "00%";
                }

                let priceNow = parseFloat(trade).toFixed(2);
                peringatan(priceNow)
                let isiElement = document.getElementById('isi');
		let title = document.getElementById('title');
                if (isiElement !== null) {
                    isiElement.style.color = !lasttrade || lasttrade === trade ? 'black' : trade > lasttrade ? 'green' : 'red';
                    isiElement.innerText = toCommas(priceNow);
		    title.innerText = toCommas(priceNow+' Chg '+parseFloat(ticker).toFixed(2) + "%");
                }else{
                    isiElement.innerText = '00';
                }
                lasttrade = trade;
            }
              

    }
    template();


});