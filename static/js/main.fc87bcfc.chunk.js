(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(t,e,a){t.exports=a(20)},,,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),i=a(8),o=a.n(i),l=(a(15),a(1)),s=a(2),u=a(4),c=a(3),h=a(5),v=(a(16),a(17),a(18),a(19),a(6)),d=function(t){function e(){return Object(l.a)(this,e),Object(u.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return n.a.createElement("div",{className:"avatar","data-x":this.props.x,"data-y":this.props.y})}}]),e}(r.Component),m=function(t){function e(){return Object(l.a)(this,e),Object(u.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.mon,e="monster prevDir".concat(t.prevDir," dir").concat(t.dir);return n.a.createElement("div",{className:e,"data-x":this.props.x,"data-y":this.props.y,"data-prevdir":t.dir,"data-id":this.props.mon.id})}}]),e}(r.Component),p=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).tile=n.a.createRef(),a.state={touched:!1},a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"hasAvatar",value:function(){var t=this.tile.current.childNodes,e=!0,a=!1,r=void 0;try{for(var n,i=t[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){if(n.value.querySelector(".avatar"))return!0}}catch(o){a=!0,r=o}finally{try{e||null==i.return||i.return()}finally{if(a)throw r}}}},{key:"hasMonster",value:function(){var t=this.tile.current.childNodes,e=!0,a=!1,r=void 0;try{for(var n,i=t[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){return!!n.value.querySelector(".monster")}}catch(o){a=!0,r=o}finally{try{e||null==i.return||i.return()}finally{if(a)throw r}}}},{key:"getAvatar",value:function(){if(this.props.tile.target)return n.a.createElement(d,{x:this.props.tile.x,y:this.props.tile.y,tile:this})}},{key:"renderMonster",value:function(t,e){return n.a.createElement(m,{key:t,mon:e,x:e.mtargetx,y:e.mtargety,prevDir:e.prevDir})}},{key:"getMonster",value:function(){var t=[];if(this.props.monster){var e=0,a=!0,r=!1,n=void 0;try{for(var i,o=this.props.rm[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value;t.push(this.renderMonster(e,l)),e++}}catch(s){r=!0,n=s}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}return t}}},{key:"render",value:function(){var t=this.props.tile,e=t.x+"-"+t.y,a=this.props.target?"target":"",r=this.props.monsterTarget?"targetM":"",i=t.touchedA?"touchedA":"",o=t.touchedM?"touchedM":"",l=t.type,s=this.getAvatar(),u=this.getMonster(),c="loc ".concat(l," \n\t\t\t\t\t\t\t").concat(a,"\n\t\t\t\t\t\t\t").concat(r,"\n\t\t\t\t\t\t\t").concat(i," \n\t\t\t\t\t\t\t").concat(o," \n\t\t\t\t\t\t\t").concat(s?"avatarT":"","\n\t\t\t\t\t\t\t").concat(u?"monsterT":"");return n.a.createElement("div",{className:c,"data-type":l,"data-loc":e,"data-x":t.x,"data-y":t.y,ref:this.tile},s,u)}}]),e}(r.Component),y=function(t){function e(){return Object(l.a)(this,e),Object(u.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"renderTile",value:function(t,e,a,r,i,o){return n.a.createElement(p,{key:t,tile:e,target:a,monster:r,rm:i,mc:o,opacity:this.props.opacity})}},{key:"render",value:function(){var t=0,e=[],a=!0,r=!1,i=void 0;try{for(var o,l=this.props.tiles[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value,u=this.props.rid,c=t,h=c+"-"+u,v=this.props.monsters,d=!1,m=0,p=[],y=!0,f=!1,b=void 0;try{for(var g,O=v[Symbol.iterator]();!(y=(g=O.next()).done);y=!0){var w=g.value;u==w.mtargety&&c==w.mtargetx&&(d=!0,m++,p.push(w))}}catch(k){f=!0,b=k}finally{try{y||null==O.return||O.return()}finally{if(f)throw b}}e.push(this.renderTile(h,s,s.target,d,p,m)),t++}}catch(k){r=!0,i=k}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return n.a.createElement("div",{className:"row"},e,n.a.createElement("div",{className:"clear"}))}}]),e}(r.Component),f=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).state={targetx:0,targety:0,monsters:a.props.monsters,tiles:a.props.rowData},a.monsters=a.props.monsters,a.move=a.move.bind(Object(v.a)(a)),a.monsterRun=a.monsterRun.bind(Object(v.a)(a)),a.updateMonster=a.updateMonster.bind(Object(v.a)(a)),a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"paint",value:function(t,e){var a=this.state.tiles,r=!0,n=!1,i=void 0;try{for(var o,l=a[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var s=o.value,u=!0,c=!1,h=void 0;try{for(var v,d=s[Symbol.iterator]();!(u=(v=d.next()).done);u=!0){var m=v.value;if(m.x==t&&m.y==e){if(m.target=!0,!m.touchedA)m.touchedA=!0,m.touchedM=!1,(0,this.props.updateTouchCount)()}else m.target=!1}}catch(p){c=!0,h=p}finally{try{u||null==d.return||d.return()}finally{if(c)throw h}}}}catch(p){n=!0,i=p}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return a}},{key:"unpaint",value:function(t,e){var a=this.state.tiles,r=!0,n=!1,i=void 0;try{for(var o,l=a[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var s=o.value,u=!0,c=!1,h=void 0;try{for(var v,d=s[Symbol.iterator]();!(u=(v=d.next()).done);u=!0){var m=v.value;if(m.x==t&&m.y==e)if(m.touchedM=!0,m.touchedA)m.touchedA=!1,(0,this.props.lowerTouchCount)()}}catch(p){c=!0,h=p}finally{try{u||null==d.return||d.return()}finally{if(c)throw h}}}}catch(p){n=!0,i=p}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return a}},{key:"calculateTargetLoc",value:function(t,e,a){var r,n;return 1==t||"ArrowRight"==t||"d"==t||"D"==t?(r=parseInt(e)+1,n=parseInt(a)):2==t||"ArrowDown"==t||"s"==t||"S"==t?(r=parseInt(e),n=parseInt(a)+1):3==t||"ArrowLeft"==t||"a"==t||"A"==t?(r=parseInt(e)-1,n=parseInt(a)):4!=t&&"ArrowUp"!=t&&"w"!=t&&"W"!=t||(r=parseInt(e),n=parseInt(a)-1),{targetx:r,targety:n}}},{key:"createOpts",value:function(t){var e=4==t?1:t+1;return[t,t,t,t,t,t,e,e,e,Math.ceil(4*Math.random())]}},{key:"monsterRun",value:function(){var t=document.querySelectorAll(".monster"),e=[],a=!0,r=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value,s=parseInt(l.getAttribute("data-prevdir")),u=s,c=l.getAttribute("data-id"),h=l.getAttribute("data-x"),v=l.getAttribute("data-y"),d=this.calculateTargetLoc(s,h,v),m=document.querySelector('.tile[data-loc="'.concat(d.targetx,"-").concat(d.targety,'"]')),p=d.targetx,y=d.targety;null!=m?this.updateBoardStateM(p,y):(s=Math.ceil(4*Math.random()),p=h,y=v);var f=this.monsters.find(function(t){return t.id==c});f.mtargetx=p,f.mtargety=y,f.prevDir=u,f.dir=s,e.push(f)}}catch(b){r=!0,n=b}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}this.setState({monsters:e})}},{key:"updateMonster",value:function(t){var e=this.monsters,a=!0,r=!1,n=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value;l.id==t&&(l.lives=l.lives-1)}}catch(s){r=!0,n=s}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}this.monsters=e.filter(function(t){return t.lives>0})}},{key:"move",value:function(t){var e=document.querySelector(".avatar"),a=e.getAttribute("data-x"),r=e.getAttribute("data-y"),n=this.calculateTargetLoc(t.key,a,r),i=document.querySelector('.tile[data-loc="'.concat(n.targetx,"-").concat(n.targety,'"]'));if(null!=i){var o=i.querySelector(".monster");if(null!=o){var l=o.getAttribute("data-id");this.updateMonster(l)}this.updateBoardState(n.targetx,n.targety)}}},{key:"updateBoardState",value:function(t,e){var a=parseInt(t),r=parseInt(e);this.setState({targetx:a,targety:r,tiles:this.paint(a,r)})}},{key:"updateBoardStateM",value:function(t,e){var a=parseInt(t),r=parseInt(e);this.setState({tiles:this.unpaint(a,r)})}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.move,!1),this.monsterRunID=setInterval(this.monsterRun,1e3)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.move,!1),clearInterval(this.monsterRunID)}},{key:"renderRows",value:function(){var t=[],e=0,a=!0,r=!1,i=void 0;try{for(var o,l=this.state.tiles[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value;t.push(n.a.createElement(y,{key:e,rid:e,targetx:this.state.targetx,targety:this.state.targety,monsters:this.monsters,tiles:s})),e++}}catch(u){r=!0,i=u}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return t}},{key:"render",value:function(){return n.a.createElement("div",{className:"board"},this.renderRows())}}]),e}(n.a.Component),b=(r.Component,function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).state={endTime:(new Date).getTime()+parseInt(a.props.time),remaining:Math.ceil(parseInt(a.props.time)/1e3)},a.countdown=a.countdown.bind(Object(v.a)(a)),a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"countdown",value:function(){var t=(new Date).getTime(),e=Math.ceil((parseInt(this.state.endTime)-t)/1e3),a=this.props.endLevel;this.setState({remaining:e}),e<0&&a()}},{key:"render",value:function(){var t="#4d807f";return this.state.remaining<=3&&(t="red"),n.a.createElement("div",{className:"time"},n.a.createElement("span",{className:"countdown-timer flasher",style:{color:t}},this.state.remaining),n.a.createElement("br",null),"seconds")}}]),e}(r.Component)),g=function(t){function e(){return Object(l.a)(this,e),Object(u.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return n.a.createElement("div",{className:"tutorial"},n.a.createElement("h3",null,"Objective"),n.a.createElement("p",null,"Turn all the tiles blue before the timer runs out."),n.a.createElement("h3",null,"Movement"),n.a.createElement("p",null,"You're the blue dot, on the blue tile in the top left corner. Move with your arrow keys - every tile you touch will turn blue."),n.a.createElement("h3",null,"Watch Out"),n.a.createElement("p",null,"Opposing forces are turning tiles gold. Undo their work by moving over them. If you touch your rivals three times, they disappear."))}}]),e}(r.Component),O=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).state={lives:3,gameOver:!0,touched:1,buttonMessage:"Begin Game!",seconds:a.props.level.time,statusCode:"new-game",statusMessage:"Paint Run",tutorial:!1},a.endLevel=a.endLevel.bind(Object(v.a)(a)),a.handleClick=a.handleClick.bind(Object(v.a)(a)),a.showTutorial=a.showTutorial.bind(Object(v.a)(a)),a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"handleClick",value:function(t){var e=t.target.getAttribute("data-statuscode");if("new-game"==e)this.setState({gameOver:!1});else if("same-level"==e)this.setState({gameOver:!1,touched:1});else if("next-level"==e){(0,this.props.increaseLevel)(),this.setState({lives:Math.min(this.state.lives+2,4),gameOver:!1,touched:1})}else if("restart"==e){this.setState({lives:3,gameOver:!1,touched:1}),(0,this.props.restart)()}}},{key:"showTutorial",value:function(){this.setState({tutorial:!this.state.tutorial})}},{key:"updateGameStatus",value:function(t,e,a,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.state.lives;this.setState({gameOver:t,statusMessage:e,buttonMessage:a,lives:n,statusCode:r})}},{key:"updateTouchCount",value:function(){this.setState({touched:parseInt(this.state.touched)+1}),this.checkForWin()}},{key:"lowerTouchCount",value:function(){this.setState({touched:parseInt(this.state.touched)-1})}},{key:"checkForWin",value:function(){this.state.touched==this.props.level.tiles&&this.updateGameStatus(!0,"Level Won","Next Level","next-level")}},{key:"endLevel",value:function(){var t=this.state.lives-1;if(t>0)var e="Out of time, you have ".concat(t," lives remaining!"),a="Try again.",r="same-level";else e="Game Over",a="Play again",r="restart";this.updateGameStatus(!0,e,a,r,t)}},{key:"getTileState",value:function(t){for(var e=this.props.level.grid,a=[],r=0;r<e.length;r++){for(var n=e[r],i=[],o=0;o<n.length;o++){var l=n[o]?"tile":"space",s=!1,u=!1,c=!1,h=!0,v=!1,d=void 0;try{for(var m,p=t[Symbol.iterator]();!(h=(m=p.next()).done);h=!0){var y=m.value;y.x==o&&y.y==r&&("a"==y.t?(u=!0,s=!0):c=!0)}}catch(f){v=!0,d=f}finally{try{h||null==p.return||p.return()}finally{if(v)throw d}}i.push({x:o,y:r,type:l,target:s,touchedA:u,touchedM:c})}a.push(i)}return a}},{key:"getMonsterState",value:function(){for(var t=[],e=this.props.level.monsters,a=0;a<e;a++){var r=Math.floor(Math.random()*this.props.level.rows/2)+Math.floor(this.props.level.rows/2),n=Math.floor(Math.random()*this.props.level.cols/2)+Math.floor(this.props.level.cols/2);t.push({mtargetx:n,mtargety:r,prevDir:1,lives:3,id:a})}return t}},{key:"render",value:function(){var t=[{t:"a",x:0,y:0}],e=this.getMonsterState(),a=this.getTileState(t),r=!0,i=!1,o=void 0;try{for(var l,s=e[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var u=l.value;t.push({t:"m",x:u.mtargetx,y:u.mtargety})}}catch(p){i=!0,o=p}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}var c=this.state.gameOver,h=this.props.level,v=this.updateTouchCount,d=this.lowerTouchCount,m=this.endLevel;return n.a.createElement("div",{className:"game-board"},n.a.createElement("div",{className:"header-content"},n.a.createElement("div",{className:"level"},n.a.createElement("h1",null,"Level ",h.levelNum),n.a.createElement("div",{className:"tbutton",onClick:this.showTutorial},"See tutorial"),this.state.tutorial?n.a.createElement(g,null):""),n.a.createElement("div",{className:"details-tab"},n.a.createElement("div",{className:"lives"},this.state.lives,n.a.createElement("br",null),n.a.createElement("span",null,"lives")),n.a.createElement("div",{className:"status"},this.state.touched,"/",h.tiles,n.a.createElement("br",null),n.a.createElement("span",null,"tiles")),c?"":n.a.createElement(b,{time:this.props.level.time,endLevel:m.bind(this)}))),n.a.createElement("div",{className:"clear"}),c?n.a.createElement("div",{className:"gameover"},n.a.createElement("h1",null,this.state.statusMessage),n.a.createElement("button",{className:"button",onClick:this.handleClick,"data-statuscode":this.state.statusCode},this.state.buttonMessage)):n.a.createElement(f,{monsters:e,rowData:a,lives:this.state.lives,tileCount:h.tiles,updateTouchCount:v.bind(this),lowerTouchCount:d.bind(this),level:this.props.level}))}}]),e}(n.a.Component),w=[{tiles:[[!0,!0,!0,!0,!1,!0],[!1,!1,!1,!0,!0,!0],[!1,!1,!0,!0,!0,!0],[!0,!1,!0,!0,!1,!0],[!0,!0,!0,!0,!1,!0],[!1,!0,!1,!0,!0,!0]]},{tiles:[[!0,!0,!0,!0,!0,!0],[!1,!1,!1,!0,!0,!0],[!1,!1,!0,!0,!1,!0],[!0,!1,!1,!0,!1,!0],[!0,!0,!0,!0,!1,!0],[!1,!0,!0,!0,!0,!0],[!0,!0,!0,!1,!0,!0]]},{tiles:[[!0,!1,!0,!0,!1,!0,!1],[!0,!1,!1,!0,!0,!0,!0],[!0,!1,!0,!0,!1,!0,!0],[!0,!1,!0,!0,!1,!0,!1],[!0,!0,!0,!1,!1,!0,!1],[!1,!0,!0,!1,!0,!0,!0],[!1,!0,!1,!0,!0,!0,!1],[!1,!0,!1,!0,!1,!0,!1],[!1,!0,!0,!0,!0,!0,!0]]}],k=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).state={level:1},a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"restart",value:function(){this.setState({level:1})}},{key:"processLevelData",value:function(){console.log(this.state.level-1);var t=w[this.state.level-1].tiles,e=t.reduce(function(t,e){return t.concat(e)}).filter(function(t){return t}).length;return{levelNum:this.state.level,grid:t,rows:t.length,cols:t[0].length,tiles:e,time:750*e,monsters:this.state.level+1}}},{key:"increaseLevel",value:function(){this.setState({level:this.state.level+1})}},{key:"render",value:function(){var t=this.increaseLevel,e=this.processLevelData(),a=this.restart;return n.a.createElement("div",{className:"body"},n.a.createElement(O,{gameOver:!1,newLevel:!0,level:e,increaseLevel:t.bind(this),restart:a.bind(this)}))}}]),e}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.fc87bcfc.chunk.js.map