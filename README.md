#Google Map Api

####	google.maps.Map(Elem, Option)
*	初始化地图

map = new google.maps.Map(elem, option)

```
elem: 	
	document.getElementById('div')

option: 
	Option = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

zoom： 地图缩扩级别（一般11-13）
center： 地图中心位置
「 latlng =new google.maps.LatLng(lat, lng) 」 
mapTypeId: 地图类型（正常、热导、3D、气象等）
「正常：google.maps.MapTypeId.ROADMAP」

EP：在DOM上可以出现地图
```

####	google.maps.LatLng(lat, lng)
*	格式化经纬度

latlng = new google.maps.LatLng(lat, lng)

（ 在	google.maps.Map(elem, option) 中有过接触 ）


####	google.maps.Geocoder

*	信息转化

geocoder = new google.maps.Geocoder()

该方法可以获取 经纬度->地址、地址->经纬度等

```
//经纬度->地址 status===200成功 / results结果
geocoder.geocode({
	'location': latLng 
}, function (results, status) {});


//地址->经纬度	
geocoder.geocode({
	'address': address 
}, function (results, status) {});
```

####	google.maps.InfoWindow(option)

*	在地图上有地址、经纬度信息

infowindow = new google.maps.InfoWindow(option)

```
message = "<b>座標:</b>" + piont.lat() + " , " + piont.lng() + "<br />" + "<b>地址:</b>" + address
options = {
	content: message,
	size: new google.maps.Size(50, 50)
}
infowindow = new google.maps.InfoWindow(option);
marker = new google.maps.Marker({
    position: latlng,
    map: map
});  

//放置信息
infowindow.open(map, marker);
//清除信息
infowindow.close()

```

####	「Event」google.maps.event.addListener(map, 'click', fn);
*	地图上点击事件

```
google.maps.event.addListener(map, 'click', function (event) {
    console.log(event.latLng);
});
	
```


####	google.maps.places.AutocompleteService()
初始化 service = new google.maps.places.AutocompleteService()


```
service.getQueryPredictions({ input: '南昌' }, fn)

fn(predictions, status) 

predictions：关于'南昌'的智能提示

```

