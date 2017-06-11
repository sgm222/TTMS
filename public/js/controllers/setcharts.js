// /*
//   *	setchartsController
//   *	author:sgm
//  */
define('controllers/setcharts',[], function () {
    var SetchartsController=["$scope","$http","$rootScope",function ($scope, $http, $rootScope){ 
			$scope.hall = [];
			$scope.movie = [];
			$scope.ticket =[];
			$scope.cid=localStorage.getItem('cid');
			$scope.hid=localStorage.getItem('hid');
			$scope.price=localStorage.getItem('price');
			$scope.mid=localStorage.getItem('mid');
			$http.get("/tticket",{params: {cid:$scope.cid,hid:$scope.hid,mid:$scope.mid}}).success(function (data) {
					$scope.movie = data[0];
					console.log($scope.movie);
				}).error(function (data, status, headers, config) {
					alert(status);
				});	
			
			var user=JSON.parse(localStorage.getItem("user"));
			var myDate = new Date();

			
			$http.get("/setcharts",{params: {cid:$scope.cid,hid:$scope.hid}},{cache:true}).success(function (data) {
				$scope.hall = data;
				$scope.$apply();
				var firstSeatLabel = 1;
				var amap=new Array();
				var bmap=new Array();
				console.log($scope.hall.row,$scope.hall.col);
				for(var i=0;i<$scope.hall.row;i++){
					for(var j=0;j<$scope.hall.col;j++)
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
							price   : $scope.price,
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
							$('<li>'+'已选&nbsp;'+'<b>'+srt[0]+'&nbsp;</b>'+'排'+'<b>&nbsp;'+srt[1]+'&nbsp;</b>'+'坐'+'</b>'+'：<br/>价格：<b>$'+parseInt(this.data().price)+'</b></li>')
								.attr('id','cart-item-'+this.settings.id)
								.data('seatId', this.settings.id)
								.appendTo($cart);
							$scope.hall.unavailable.push(this.settings.label);
							$counter.text(sc.find('selected').length+1);
							$total.text(recalculateTotal(sc)+parseInt(this.data().price));
							$payMon.text(recalculateTotal(sc)+parseInt(this.data().price));
							
							return 'selected';
						} else if (this.status() == 'selected') {
							//update the counter
							$counter.text(sc.find('selected').length-1);
							//and total
							$total.text(recalculateTotal(sc)-parseInt(this.data().price));
							$payMon.text(recalculateTotal(sc)-parseInt(this.data().price));
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
				sc.get($scope.hall.unavailable).status('unavailable');
	
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
					$cart.empty();
					$counter.text(0);
					$total.text(0);
					$payMon.text(0);
					sc.get($scope.hall.unavailable).status('unavailable');
					sc.find('selected').each(function(){
						this.status('unavailable');
					});
					$http({
							url: "/updatetickethall",
							params: {id:$scope.hall.id,cid:$scope.hall.cenima_id},
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							method: "put"
						}).success(function (data, status, headers, config){
							$scope.hall=data;
					}).error(function (data, status, headers, config) {
						alert(status);
				 	});

					$http.post('/addticket', $scope.ticket).success(function (data, status, headers, config) {
	                    if (data.err) {
	                        console.log(data.err);
	                    }else{
	                    	close_pop();
	                    	alert("购票成功");
	                    }  
                	}).error(function (data, status, headers, config) {
						alert(status);
				 	});
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
						$scope.ticket.time=myDate.toLocaleString();
						$scope.ticket.date=$scope.ticket.time.split(" ")[0];
						$scope.ticket.user_name=user.name;
						$scope.ticket.ticket_id=Math.floor(Math.random() * 12345678+67821909);
						$scope.ticket.cenima_name=$scope.movie.cenima_name;
    					$scope.ticket.hall_name=$scope.movie.hall_name;
    					$scope.ticket.movie_name=$scope.movie.movie_name;
    					$scope.ticket.movie_price=$scope.movie.movie_price;
						if(user==null)
							alert("请先登录");
						else{
							showDialog();	
						}
				});

				}).error(function (data, status, headers, config) {
					alert(status);
				});

			function recalculateTotal(sc) {
				var total = 0;			
				//basically find every selected seat and sum its price
				sc.find('selected').each(function () {
					total += parseInt(this.data().price);
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
		}];
		return SetchartsController;
});


