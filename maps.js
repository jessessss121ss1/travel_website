(function(){
  if (typeof L === 'undefined') {
    document.querySelectorAll('#city-map-frame,.map-frame').forEach(function(el){
      el.textContent = '地图库没有加载到。请直接打开「美国14天行程可视化.html」（不要只开 maps.js）。';
    });
    return;
  }

  function P(name, lat, lng, opt){
    opt = opt || {};
    return {
      name:name, lat:lat, lng:lng,
      time:opt.t||'', kind:opt.k||'sight', en:opt.en||'',
      via:opt.via||null
    };
  }

  var H = {
    sf: P('Vintage Court', 37.7904, -122.4086, {k:'stay', en:'650 Bush St'}),
    marina: P('Monarch Valley Inn', 36.6803, -121.7848, {k:'stay', en:'416 Reservation Rd, Marina'}),
    morro: P('Best Western San Marcos', 35.3659, -120.8475, {k:'stay', en:'250 Pacific St, Morro Bay'}),
    sirtaj: P('Sirtaj Beverly Hills', 34.0670, -118.4008, {k:'stay', en:'120 S Reeves Dr'}),
    clarion: P('Clarion Arlington', 38.8863, -77.0846, {k:'stay', en:'1200 N Courthouse Rd'}),
    harmony: P('Harmony Suites Secaucus', 40.7879, -74.0612, {k:'stay', en:'455 Plaza Dr'})
  };

  var DAY = {
    d1: {
      east:false,
      routes:[{
        title:'旧金山滨海',
        pois:[
          P('旧金山国际机场 SFO', 37.6213, -122.3790, {t:'10:55', k:'fly'}),
          Object.assign({}, H.sf, {t:'入住', via:{mode:'bus', label:'公交 292→30', min:60, km:22}}),
          P('渔人码头', 37.8083, -122.4156, {t:'14:00', en:"Fisherman's Wharf", via:{mode:'walk', label:'步行/公交', min:25, km:1.8}}),
          P('Pier 39 海狮', 37.8087, -122.4098, {t:'15:30', via:{mode:'walk', label:'步行', min:8, km:0.55}}),
          P('金门大桥 Vista Point', 37.8078, -122.4756, {t:'17:30', en:'南岸观景', via:{mode:'uber', label:'公交/打车', min:20, km:5.5}})
        ]
      }]
    },
    d2: {
      east:false,
      routes:[
        {
          title:'上午 · 旧金山市区',
          pois:[
            Object.assign({}, H.sf, {t:'08:00 出发'}),
            P('唐人街龙门', 37.7906, -122.4056, {t:'08:15', en:'Dragon Gate', via:{mode:'walk', label:'步行', min:8, km:0.45}}),
            P('Powell 叮当车', 37.7916, -122.4091, {t:'09:30', en:'Powell & California', via:{mode:'walk', label:'步行回 Powell', min:8, km:0.45}}),
            P('九曲花街', 37.8021, -122.4187, {t:'09:50', en:'Lombard Street', via:{mode:'cable', label:'Powell-Hyde 叮当车', min:20, km:2.2}}),
            P('艺术宫', 37.8029, -122.4484, {t:'10:15', en:'Palace of Fine Arts', via:{mode:'uber', label:'步行/打车', min:15, km:2.6}}),
            P('彩绘女士', 37.7763, -122.4346, {t:'11:00', en:'Alamo Square', via:{mode:'uber', label:'打车', min:12, km:3.4}}),
            Object.assign({}, H.sf, {t:'11:30 取行李退房', via:{mode:'uber', label:'打车回酒店', min:12, km:2.8}}),
            P('Alamo 取车', 37.7865, -122.4103, {t:'14:00', k:'move', en:"340 O'Farrell St", via:{mode:'walk', label:'步行', min:10, km:0.8}})
          ]
        },
        {
          title:'下午 · 一号公路南下',
          drive:true,
          pois:[
            P('半月湾', 37.4636, -122.4286, {t:'15:00', en:'Half Moon Bay', via:{mode:'drive', label:'开车', min:40, km:45}}),
            P('圣克鲁斯', 36.9641, -122.0173, {t:'16:00', en:'Santa Cruz Boardwalk', via:{mode:'drive', label:'开车', min:50, km:70}}),
            P('17-Mile Drive 孤柏', 36.5696, -121.9650, {t:'17:00', en:'Lone Cypress', via:{mode:'drive', label:'开车', min:50, km:55}}),
            P('卡梅尔', 36.5552, -121.9233, {t:'18:30', en:'Carmel-by-the-Sea', via:{mode:'drive', label:'开车', min:15, km:8}}),
            Object.assign({}, H.marina, {t:'过夜', via:{mode:'drive', label:'开车', min:20, km:16}})
          ]
        }
      ]
    },
    d3: {
      east:false,
      routes:[{
        title:'大苏尔 → 莫罗湾',
        drive:true,
        pois:[
          Object.assign({}, H.marina, {t:'出发'}),
          P('比克斯比溪大桥', 36.3714, -121.9016, {t:'09:00', en:'Bixby Creek Bridge', via:{mode:'drive', label:'开车', min:40, km:38}}),
          P('Nepenthe', 36.2200, -121.7594, {t:'11:00', k:'food', via:{mode:'drive', label:'开车南下', min:25, km:22}}),
          P('麦克威瀑布', 36.1577, -121.6722, {t:'12:00', en:'McWay Falls', via:{mode:'drive', label:'开车南下', min:15, km:12}}),
          P('象海豹海滩', 35.6636, -121.2848, {t:'15:00', en:'Piedras Blancas', via:{mode:'drive', label:'开车南下', min:50, km:58}}),
          P('莫罗石', 35.3694, -120.8678, {t:'傍晚', en:'Morro Rock', via:{mode:'drive', label:'开车', min:45, km:55}}),
          Object.assign({}, H.morro, {t:'入住', via:{mode:'walk', label:'步行', min:8, km:0.5}})
        ]
      }]
    },
    d4: {
      east:false,
      routes:[{
        title:'莫罗湾 → 洛杉矶',
        drive:true,
        pois:[
          Object.assign({}, H.morro, {t:'07:30 出发'}),
          P('圣巴巴拉法院', 34.4241, -119.7027, {t:'09:15', en:'Santa Barbara Courthouse', via:{mode:'drive', label:'开车 101', min:90, km:150}}),
          P('马里布海岸', 34.0218, -118.8314, {t:'11:30', en:'Zuma Beach / PCH', via:{mode:'drive', label:'开车 PCH', min:70, km:95}}),
          P('圣莫尼卡码头', 34.0085, -118.4976, {t:'14:00', en:'Santa Monica Pier', via:{mode:'drive', label:'开车', min:35, km:32}}),
          P('第三街 Promenade', 34.0161, -118.4966, {t:'15:15', via:{mode:'walk', label:'步行', min:8, km:0.5}}),
          Object.assign({}, H.sirtaj, {t:'16:30 入住', via:{mode:'drive', label:'开车', min:25, km:14}}),
          P('Rodeo Drive', 34.0696, -118.4030, {t:'17:30', via:{mode:'walk', label:'步行', min:8, km:0.45}})
        ]
      }]
    },
    d5: {
      east:false,
      routes:[{
        title:'洛杉矶一日',
        drive:true,
        pois:[
          Object.assign({}, H.sirtaj, {t:'09:00 出发'}),
          P('Crypto.com Arena', 34.0430, -118.2673, {t:'10:00', via:{mode:'drive', label:'开车', min:35, km:18}}),
          P('盖蒂中心', 34.0780, -118.4741, {t:'12:30', en:'Getty Center', via:{mode:'drive', label:'开车', min:45, km:22}}),
          P('Rodeo Drive', 34.0696, -118.4030, {t:'15:30', via:{mode:'drive', label:'开车 Sunset', min:20, km:10}}),
          P('星光大道', 34.1020, -118.3409, {t:'16:00', en:'Walk of Fame / TCL', via:{mode:'drive', label:'开车', min:20, km:9}}),
          P('Hollywood Sign', 34.1282, -118.3298, {t:'16:35', en:'Lake Hollywood Park', via:{mode:'drive', label:'开车', min:15, km:5}}),
          P('格里菲斯天文台', 34.1184, -118.3004, {t:'17:15', en:'Griffith Observatory', via:{mode:'drive', label:'开车', min:12, km:4}})
        ]
      }]
    },
    d7: {
      east:true,
      routes:[{
        title:'国家广场 · 单向',
        pois:[
          Object.assign({}, H.clarion, {t:'08:30 自助'}),
          P('国会大厦导览', 38.8899, -77.0091, {t:'10:40', en:'Capitol Visitor Center · Tour', via:{mode:'uber', label:'打车', min:22, km:6}}),
          P('华盛顿纪念碑', 38.8895, -77.0353, {t:'12:30', via:{mode:'walk', label:'沿 Mall 向西', min:18, km:1.3}}),
          P('白宫外观', 38.8977, -77.0365, {t:'13:15', en:'White House', via:{mode:'walk', label:'向北小绕', min:10, km:0.8}}),
          P('航空航天博物馆', 38.8882, -77.0199, {t:'14:00', en:'Air & Space', via:{mode:'walk', label:'折回向南', min:12, km:1.0}}),
          P('杰斐逊纪念堂', 38.8814, -77.0365, {t:'16:15', en:'Jefferson Memorial', via:{mode:'walk', label:'向南进潮汐湖', min:15, km:1.2}}),
          P('马丁·路德·金纪念堂', 38.8862, -77.0443, {t:'16:50', en:'MLK Memorial', via:{mode:'walk', label:'沿潮汐湖', min:10, km:0.9}}),
          P('林肯纪念堂', 38.8893, -77.0502, {t:'17:15', en:'Lincoln Memorial · 日落', via:{mode:'walk', label:'继续向西', min:10, km:0.8}}),
          Object.assign({}, H.clarion, {t:'18:30 回酒店', via:{mode:'uber', label:'打车', min:15, km:5}})
        ]
      }]
    },
    d8: {
      east:true,
      routes:[
        {
          title:'上午 · 赴 Union Station',
          pois:[
            Object.assign({}, H.clarion, {t:'08:30 退房'}),
            P('国家美术馆西馆', 38.8913, -77.0200, {t:'09:00', en:'National Gallery', via:{mode:'uber', label:'打车', min:20, km:6}}),
            P('Union Station', 38.8977, -77.0064, {t:'11:00', k:'move', en:'12:00 大巴', via:{mode:'uber', label:'打车东北', min:10, km:1.5}})
          ]
        },
        {
          title:'傍晚 · 纽约中城',
          pois:[
            P('大巴下车点', 40.7494, -73.9936, {t:'16:30', k:'move', en:'31st & 8th'}),
            Object.assign({}, H.harmony, {t:'16:40 入住', via:{mode:'uber', label:'打车', min:18, km:8}}),
            P('纽约公共图书馆', 40.7532, -73.9822, {t:'17:30', via:{mode:'metro', label:'NJ Transit + 步行', min:20, km:8}}),
            P('Bryant Park', 40.7536, -73.9832, {t:'17:50', via:{mode:'walk', label:'步行', min:3, km:0.12}}),
            P('第五大道 / Trump Tower', 40.7624, -73.9738, {t:'18:00', via:{mode:'walk', label:'步行', min:15, km:1.2}}),
            P('时代广场', 40.7580, -73.9855, {t:'18:45', via:{mode:'walk', label:'步行', min:12, km:0.9}}),
            P('Top of the Rock', 40.7587, -73.9787, {t:'19:30', via:{mode:'walk', label:'步行', min:8, km:0.55}})
          ]
        }
      ]
    },
    d9: {
      east:true,
      routes:[{
        title:'纽约下城',
        pois:[
          Object.assign({}, H.harmony, {t:'出发'}),
          P('Battery Park 码头', 40.7033, -74.0168, {t:'09:00', k:'local', via:{mode:'metro', label:'NJ Transit + 地铁', min:40, km:12}}),
          P('自由女神像', 40.6892, -74.0445, {t:'10:00', via:{mode:'ferry', label:'渡轮', min:20, km:2.8}}),
          P('华尔街铜牛', 40.7056, -74.0134, {t:'12:00', en:'Charging Bull', via:{mode:'ferry', label:'渡轮回 + 步行', min:25, km:2.5}}),
          P('9/11 纪念馆', 40.7115, -74.0133, {t:'13:00', via:{mode:'walk', label:'步行', min:10, km:0.7}}),
          P('布鲁克林大桥', 40.7061, -73.9969, {t:'15:00', en:'曼哈顿入口', via:{mode:'walk', label:'步行', min:15, km:1.1}}),
          P('DUMBO', 40.7032, -73.9894, {t:'16:00', en:'Washington St', via:{mode:'walk', label:'过桥步行', min:25, km:1.6}}),
          P('切尔西市场', 40.7424, -74.0061, {t:'18:00', k:'food', via:{mode:'metro', label:'地铁', min:20, km:4.8}})
        ]
      }]
    },
    d10: {
      east:true,
      routes:[{
        title:'上城 + 高线',
        pois:[
          Object.assign({}, H.harmony, {t:'出发'}),
          P('联合国总部外观', 40.7489, -73.9681, {t:'09:00', via:{mode:'metro', label:'NJ Transit + 地铁', min:35, km:10}}),
          P('中央公园 Bow Bridge', 40.7758, -73.9718, {t:'09:30', via:{mode:'walk', label:'步行/地铁', min:20, km:3}}),
          P('大都会博物馆', 40.7794, -73.9632, {t:'10:15', en:'The Met', via:{mode:'walk', label:'步行', min:10, km:0.8}}),
          P('高线公园', 40.7478, -74.0048, {t:'14:30', en:'23 St 入口', via:{mode:'metro', label:'地铁', min:25, km:4.5}}),
          P('The Vessel', 40.7538, -74.0022, {t:'16:00', en:'Hudson Yards', via:{mode:'walk', label:'高线走过去', min:12, km:0.8}})
        ]
      }]
    },
    d11: {
      east:true,
      routes:[
        {
          title:'清晨 · 退房赶车',
          pois:[
            Object.assign({}, H.harmony, {t:'05:30 退房'}),
            P('大巴上车点', 40.7494, -73.9936, {t:'06:30', k:'local', en:'31st & 8th', via:{mode:'uber', label:'打车/NJ Transit', min:25, km:8}})
          ]
        },
        {
          title:'波士顿打卡',
          pois:[
          P('South Station', 42.3519, -71.0552, {t:'11:15', k:'move'}),
          P('自由之路 / 波士顿公园', 42.3551, -71.0656, {t:'11:30', via:{mode:'walk', label:'步行', min:12, km:0.9}}),
          P('昆西市场', 42.3600, -71.0545, {t:'12:30', k:'food', en:'Faneuil Hall', via:{mode:'walk', label:'步行', min:15, km:1.1}}),
          P('哈佛 Yard', 42.3744, -71.1182, {t:'14:15', via:{mode:'metro', label:'Red Line', min:20, km:6.5}}),
          P('MIT Great Dome', 42.3599, -71.0921, {t:'15:15', via:{mode:'walk', label:'步行/地铁', min:20, km:2.8}}),
          P('洛根机场 BOS', 42.3656, -71.0096, {t:'21:00', k:'fly', via:{mode:'metro', label:'Silver Line SL1', min:30, km:6}})
          ]
        }
      ]
    }
  };

  var CITIES = [
    {id:'sf', label:'旧金山', east:false, pois:DAY.d1.routes[0].pois.slice(1).concat(DAY.d2.routes[0].pois.slice(1))},
    {id:'hwy1', label:'一号公路', east:false, drive:true, pois:DAY.d2.routes[1].pois.concat(DAY.d3.routes[0].pois.slice(1))},
    {id:'la', label:'洛杉矶', east:false, drive:true, pois:[
      DAY.d4.routes[0].pois[3],
      DAY.d4.routes[0].pois[4],
      H.sirtaj,
      DAY.d4.routes[0].pois[6],
      DAY.d5.routes[0].pois[1],
      DAY.d5.routes[0].pois[2],
      DAY.d5.routes[0].pois[4],
      DAY.d5.routes[0].pois[5],
      DAY.d5.routes[0].pois[6]
    ]},
    {id:'dc', label:'华盛顿', east:true, pois:DAY.d7.routes[0].pois.concat(DAY.d8.routes[0].pois.slice(1))},
    {id:'ny', label:'纽约', east:true, pois:DAY.d8.routes[1].pois.concat(DAY.d9.routes[0].pois.slice(1), DAY.d10.routes[0].pois.slice(1))},
    {id:'bos', label:'波士顿', east:true, pois:DAY.d11.routes[1].pois}
  ];

  var MODE = {
    walk:{icon:'🚶', name:'步行', color:'#0f766e'},
    bus:{icon:'🚌', name:'公交', color:'#0e7490'},
    metro:{icon:'🚇', name:'地铁', color:'#0e7490'},
    cable:{icon:'🚋', name:'叮当车', color:'#b45309'},
    uber:{icon:'🚕', name:'打车', color:'#2563eb'},
    drive:{icon:'🚗', name:'开车', color:'#1d4ed8'},
    fly:{icon:'✈️', name:'飞行', color:'#b45309'},
    ferry:{icon:'⛴', name:'渡轮', color:'#0369a1'}
  };

  function haversine(a, b){
    var R = 6371, toRad = Math.PI/180;
    var dLat = (b.lat-a.lat)*toRad, dLng = (b.lng-a.lng)*toRad;
    var s = Math.sin(dLat/2)*Math.sin(dLat/2) +
      Math.cos(a.lat*toRad)*Math.cos(b.lat*toRad)*Math.sin(dLng/2)*Math.sin(dLng/2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
  }

  function inferVia(a, b, route){
    if (b.via) return b.via;
    var km = haversine(a, b);
    var road = km * (route && route.drive ? 1.35 : 1.25);
    if ((a.kind==='fly' || b.kind==='fly') && road > 40){
      return {mode:'fly', min:Math.round(40+road/12), km:road};
    }
    if (route && route.drive){
      return {mode:'drive', min:Math.max(8, Math.round(road/0.7)), km:road};
    }
    if (road < 1.2) return {mode:'walk', min:Math.max(4, Math.round(road/0.08)), km:road};
    if (road < 8) return {mode:'uber', min:Math.round(8+road/0.35), km:road};
    return {mode:'drive', min:Math.round(road/0.65), km:road};
  }

  function fmtMin(min){
    if (!min) return '';
    if (min < 60) return min+'min';
    var h = Math.floor(min/60), m = min%60;
    return m ? h+'h'+m+'min' : h+'h';
  }

  function fmtDist(km){
    if (km == null) return '';
    return km < 1 ? Math.round(km*1000)+'m' : (Math.round(km*10)/10)+'km';
  }

  function formatVia(v){
    if (!v) return '';
    var meta = MODE[v.mode] || {icon:'→', name:v.label||''};
    var name = v.label || meta.name;
    var bits = [meta.icon+' '+name];
    var dist = fmtDist(v.km);
    if (dist) bits.push(dist);
    if (v.min) bits.push('约'+fmtMin(v.min));
    return bits.join(' · ');
  }

  var TILES = [
    {
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      opts:{maxZoom:19, attribution:'© Esri'}
    },
    {
      url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      opts:{subdomains:'abcd', maxZoom:19, attribution:'© OSM © CARTO'}
    },
    {
      url:'https://webrd0{s}.is.autonavi.com/appmaptile?lang=en&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      opts:{subdomains:'1234', maxZoom:18, attribution:'© AMap'}
    }
  ];

  function addTiles(map){
    var i = 0, fails = 0, layer;
    function mount(idx){
      if (layer) map.removeLayer(layer);
      var src = TILES[idx];
      layer = L.tileLayer(src.url, Object.assign({
        keepBuffer: 4,
        updateWhenIdle: true,
        updateWhenZooming: false,
        detectRetina: false,
        className: 'map-tiles'
      }, src.opts));
      layer.on('tileerror', function(){
        fails++;
        if (fails >= 6 && i < TILES.length-1){
          i++; fails = 0;
          mount(i);
        }
      });
      layer.addTo(map);
    }
    mount(0);
  }

  function pinIcon(n, kind, east){
    var k = kind || 'sight';
    var extra = (east && (k==='sight'||k==='food')) ? ' east' : '';
    return L.divIcon({
      className: 'poi-icon',
      html: '<div class="poi-pin '+k+extra+'">'+n+'</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  }

  function draw(frame, listEl, pois, spec){
    spec = spec || {};
    var east = !!spec.east;
    if (frame._leaflet_map){
      frame._leaflet_map.remove();
      frame._leaflet_map = null;
    }
    frame.replaceChildren();
    frame.classList.add('is-loading');
    if (listEl) listEl.innerHTML = '';
    var legsEl = frame.nextElementSibling;
    if (!legsEl || !legsEl.classList.contains('map-legs')){
      legsEl = frame.parentNode && frame.parentNode.querySelector('.map-legs');
    }
    if (legsEl) legsEl.innerHTML = '';

    var map = L.map(frame, {
      scrollWheelZoom:true,
      zoomControl:false,
      touchZoom:true,
      doubleClickZoom:true,
      boxZoom:true,
      dragging:true,
      attributionControl:true,
      center:[pois[0].lat, pois[0].lng],
      zoom:13
    });
    addTiles(map);
    frame._leaflet_map = map;
    L.control.zoom({position:'topright'}).addTo(map);
    map.scrollWheelZoom.disable();
    map.on('mouseover focus', function(){ map.scrollWheelZoom.enable(); });
    map.on('mouseout blur', function(){ map.scrollWheelZoom.disable(); });

    var latlngs = [];
    pois.forEach(function(poi, i){
      var n = i + 1;
      var ll = [poi.lat, poi.lng];
      latlngs.push(ll);
      var m = L.marker(ll, {icon: pinIcon(n, poi.kind, east)}).addTo(map);
      var g = 'https://www.google.com/maps/dir/?api=1&destination='+poi.lat+','+poi.lng;
      var html = '<div class="poi-pop"><b>'+n+'. '+poi.name+'</b>';
      if (poi.en) html += '<span>'+poi.en+'</span><br>';
      if (poi.time) html += '<span>'+poi.time+'</span><br>';
      if (i > 0){
        var v = inferVia(pois[i-1], poi, spec);
        var txt = formatVia(v);
        if (txt) html += '<span>'+txt+'</span><br>';
      }
      html += '<a href="'+g+'" target="_blank" rel="noopener">Google 导航</a></div>';
      m.bindPopup(html);
      if (listEl){
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        var badge = document.createElement('span');
        var extra = (east && (poi.kind==='sight'||poi.kind==='food'||!poi.kind)) ? ' east' : '';
        badge.className = 'map-n '+(poi.kind||'sight')+extra;
        badge.textContent = n;
        btn.appendChild(badge);
        btn.appendChild(document.createTextNode((poi.time ? poi.time+' · ' : '')+poi.name));
        btn.addEventListener('click', function(){
          listEl.querySelectorAll('button').forEach(function(b){ b.classList.remove('on'); });
          btn.classList.add('on');
          map.setView(ll, Math.max(map.getZoom(), 14));
          m.openPopup();
        });
        li.appendChild(btn);
        listEl.appendChild(li);
      }
    });

    if (!legsEl && frame.parentNode){
      legsEl = document.createElement('div');
      legsEl.className = 'map-legs';
      frame.parentNode.insertBefore(legsEl, frame.nextSibling);
    }

    for (var i = 1; i < pois.length; i++){
      var a = pois[i-1], b = pois[i];
      var via = inferVia(a, b, spec);
      var meta = MODE[via.mode] || MODE.walk;
      var skipCityHop = spec.city && (via.km == null ? haversine(a,b) : via.km) > 15 && via.mode !== 'drive';
      if (skipCityHop) continue;
      var color = east && via.mode==='walk' ? '#6d28d9' : meta.color;
      var dashed = (via.mode==='walk' || via.mode==='metro' || via.mode==='bus') ? '5 7' : null;
      var line = L.polyline([[a.lat,a.lng],[b.lat,b.lng]], {
        color:color, weight: via.mode==='walk' ? 3 : 3.5, opacity:0.85,
        dashArray: dashed
      }).addTo(map);
      var label = formatVia(via);
      line.bindTooltip(label, {
        permanent:true, direction:'center', className:'seg-label', opacity:1
      });
      if (legsEl){
        var span = document.createElement('span');
        span.className = 'map-leg';
        span.innerHTML = '<b>'+i+'→'+(i+1)+'</b>'+label;
        legsEl.appendChild(span);
      }
    }

    function tipZoom(){
      var show = map.getZoom() >= (spec.drive ? 10 : 12);
      map.eachLayer(function(layer){
        if (layer.getTooltip && layer.getTooltip()){
          var el = layer.getTooltip().getElement();
          if (el) el.style.display = show ? '' : 'none';
        }
      });
    }
    map.on('zoomend', tipZoom);
    map.on('moveend', tipZoom);

    function fit(){
      map.invalidateSize();
      if (latlngs.length === 1) map.setView(latlngs[0], 14);
      else map.fitBounds(L.latLngBounds(latlngs), {padding:[36,36], maxZoom:15});
    }

    fit();
    frame.classList.remove('is-loading');
    setTimeout(fit, 200);
    setTimeout(function(){ fit(); tipZoom(); }, 600);
    return map;
  }

  function mountDay(dayEl, spec){
    var label = dayEl.querySelector('.timeline-label');
    if (!label) return;
    var wrap = document.createElement('div');
    wrap.className = 'day-map';
    wrap.innerHTML = '<div class="day-map-hd"><b>今日路线图</b><span class="day-map-note">可拖动 · 滚轮/双指缩放 · 右上角 +/-</span></div>';
    label.parentNode.insertBefore(wrap, label);

    var multi = spec.routes.length > 1;
    var blocks = [];
    spec.routes.forEach(function(route){
      var block = document.createElement('div');
      block.className = 'day-map-route';
      if (multi){
        var hd = document.createElement('div');
        hd.className = 'day-map-route-hd';
        hd.textContent = route.title;
        block.appendChild(hd);
      }
      var frame = document.createElement('div');
      frame.className = 'map-frame';
      if (multi) frame.classList.add('map-frame-stacked');
      var legs = document.createElement('div');
      legs.className = 'map-legs';
      var list = document.createElement('ol');
      list.className = 'map-list';
      block.appendChild(frame);
      block.appendChild(legs);
      block.appendChild(list);
      wrap.appendChild(block);
      blocks.push({frame:frame, list:list, route:route});
    });

    var inited = false;
    function initAll(){
      if (inited) return;
      inited = true;
      blocks.forEach(function(b){
        draw(b.frame, b.list, b.route.pois, {east:spec.east, drive:!!b.route.drive});
      });
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        initAll();
        io.disconnect();
      });
    }, {rootMargin:'40px'});
    io.observe(wrap);
  }

  Object.keys(DAY).forEach(function(id){
    var el = document.querySelector('.day[data-day="'+id+'"]');
    if (el) mountDay(el, DAY[id]);
  });

  var cityFrame = document.getElementById('city-map-frame');
  var cityList = document.getElementById('city-map-list');
  var cityTabs = document.getElementById('city-map-tabs');
  if (cityFrame && cityTabs){
    var cityInited = false;
    function showCity(i){
      var city = CITIES[i];
      Array.prototype.forEach.call(cityTabs.children, function(b, idx){ b.className = idx===i ? 'on' : ''; });
      cityTabs.className = 'map-tabs'+(city.east?' east':'');
      draw(cityFrame, cityList, city.pois, {east:city.east, drive:!!city.drive, city:true});
    }
    CITIES.forEach(function(city, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = city.label;
      b.addEventListener('click', function(){ showCity(i); });
      cityTabs.appendChild(b);
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting || cityInited) return;
        cityInited = true;
        showCity(0);
        io.disconnect();
      });
    }, {rootMargin:'40px'});
    io.observe(cityFrame);
  }

  window.addEventListener('resize', function(){
    document.querySelectorAll('.map-frame').forEach(function(frame){
      if (frame._leaflet_map) frame._leaflet_map.invalidateSize();
    });
  });
})();
