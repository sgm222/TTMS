$(document).ready(function() {
	// console.log("js");
	var element = angular.element(document.getElementById("app"));
  	var controller = element.controller();
  	var scope = element.scope();
  	scope.$apply();
  	console.log(scope.hall);
  	console.log(scope.cid);
  	console.log(scope.row);
				var firstSeatLabel = 1;
				var amap=new Array();
				var bmap=new Array();
				console.log(row,col);
				for(var i=0;i<row;i++){
					for(var j=0;j<col;j++)
					{
						bmap[j]='f';
					}
					var b=bmap.join("");
					amap[i]=b;
				}
				var $cart = $('#selected-seats'),
					$counter = $('#counter'),
					$total = $('#total'),
					$payMon = $('#payMon'),
					sc = $('#seat-map').seatCharts({
					map:[].concat(amap),	
					seats: {
						f: {
							price   : 100,
							classes : 'first-class', //your custom CSS class
							category: '可选'
						},				
					
					},
					naming : {
						top : false,
						getLabel : function (character, row, column) {
							return firstSeatLabel++;
						},
					},
					legend : {
						node : $('#legend'),
					    items : [
							[ 'f', 'available',   '可选' ],
							[ 'f', 'unavailable', '已售'],
							[ 'f', 'selected', '已选']

					    ]					
					},
					click: function () {
						if (this.status() == 'available') {
							var srt=this.settings.label.split('_');
							$('<li>'+'已选&nbsp;'+'<b>'+srt[0]+'&nbsp;</b>'+'排'+'<b>&nbsp;'+srt[1]+'&nbsp;</b>'+'坐'+'</b>'+'：<br/>价格：<b>$'+this.data().price+'</b></li>')
								.attr('id','cart-item-'+this.settings.id)
								.data('seatId', this.settings.id)
								.appendTo($cart);
							
							$counter.text(sc.find('selected').length+1);
							$total.text(recalculateTotal(sc)+this.data().price);
							$payMon.text(recalculateTotal(sc)+this.data().price);
							
							return 'selected';
						} else if (this.status() == 'selected') {
							//update the counter
							$counter.text(sc.find('selected').length-1);
							//and total
							$total.text(recalculateTotal(sc)-this.data().price);
							$payMon.text(recalculateTotal(sc)-this.data().price);
							//remove the item from our cart
							$('#cart-item-'+this.settings.id).remove();
						
							//seat has been vacated
							return 'available';
						} else if (this.status() == 'unavailable') {
							//seat has been already booked
							return 'unavailable';
						} else {
							return this.style();
						}
					}
				});
	
				//关闭支付
				$('#closePay').on('click', function(){
				
					
				if(confirm('确定关闭此次交易？')){
					$cart.empty();
					$total.text('0');
					$payMon.text('0');
					$counter.text('0');
					close_pop();
					sc.find('selected').each(function(){
					this.status('available');
					});
						}
				});


				//确认支付
				$('#confirmPay').on('click', function(){
					sc.find('selected').each(function(){
					this.status('unavailable');
					});
					alert('支付成功! \n\n' + 
						' 订单编号为: '+Math.floor(Math.random() * 12345678)+67821909);
					
				// 	// window.history.back(-1); 
				 	window.location.href = "#";
				});

				//暂不支付
				$('#cancelPay').on('click', function(){
				
					close_pop();
				});

				//this will handle "[cancel]" link clicks
				$('#selected-seats').on('click', '.cancel-cart-item', function () {
					sc.get($(this).parents('li:first').data('seatId')).click();
				});
				$('#checkout-button').on('click', function () {
					// sc.find('selected').each(function(){
					// this.status('unavailable');
					// });
					showDialog();
		});
				//let's pretend some seats have already been booked
				sc.get(['1_2', '1_15', '2_2', '2_15']).status('unavailable');
		
		});

		function recalculateTotal(sc) {
			var total = 0;
			
			//basically find every selected seat and sum its price
			sc.find('selected').each(function () {
				total += this.data().price;
			});
			
			return total;
		}
		// function selected(sc){
		// 	sc.find('selected').each(function(){
		// 			this.status('unavailable');
		// 	});
		// }

		//自定义弹出窗口事件
		function showDialog(){

				var dialog = document.getElementById("pop_frame").style.display;

				if(dialog == 'none'){

					document.getElementById("pop_frame").style.display = 'block';

					var middiag = document.getElementById("mid");

					middiag.style.display = "block";

					middiag.style.background = "rgba(128,128,128,0.3)";

					}

					if(dialog == "block"){

					document.getElementById("pop_frame").style.display = 'none';

					}

				}

				//关闭小窗口，使中间的那层页面和小窗口隐藏，父页面呈现

				function close_pop(){

					var main = document.getElementById("pop_frame");

					main.style.display = "none";

					document.getElementById("mid").style.display = "none";

					}
