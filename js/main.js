"use strict";!function(){function t(t,e){return null!=t?t:e}function e(t){this.garden=t,this.reset()}function i(t){this.nodes=[],this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.started=!1,this.nightmode=!1,window.addEventListener("keydown",function(t){16===t.which&&(i.m=15)}),window.addEventListener("keyup",function(t){16===t.which&&(i.m=0)}),1!==n&&(this.canvas.style.transform="scale("+1/n+")",this.canvas.style.transformOrigin="0 0"),this.canvas.id="nodegarden";var i=new e(this);i.m=0,i.update=function(){},i.reset=function(){},i.render=function(){},i.x=Number.MAX_SAFE_INTEGER,i.y=Number.MAX_SAFE_INTEGER,document.addEventListener("mousemove",function(t){i.x=t.pageX,i.y=t.pageY}),document.documentElement.addEventListener("mouseleave",function(t){i.x=Number.MAX_SAFE_INTEGER,i.y=Number.MAX_SAFE_INTEGER}),this.nodes.unshift(i),this.resize(),this.container.appendChild(this.canvas)}e.prototype.reset=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=e.x,n=e.y,s=e.vx,h=e.vy,o=e.m;this.x=t(i,Math.random()*this.garden.width),this.y=t(n,Math.random()*this.garden.height),this.vx=t(s,1*Math.random()-.5),this.vy=t(h,1*Math.random()-.5),this.m=t(o,2*Math.random()+1)},e.prototype.addForce=function(t,e){this.vx+=t*e.x/this.m,this.vy+=t*e.y/this.m},e.prototype.distanceTo=function(t){var e=t.x-this.x,i=t.y-this.y,n=Math.sqrt(Math.pow(e,2)+Math.pow(i,2));return{x:e,y:i,total:n}},e.prototype.update=function(){this.x+=this.vx,this.y+=this.vy,(this.x>this.garden.width+50||this.x<-50||this.y>this.garden.height+50||this.y<-50)&&this.reset()},e.prototype.squaredDistanceTo=function(t){return(t.x-this.x)*(t.x-this.x)+(t.y-this.y)*(t.y-this.y)},e.prototype.collideTo=function(t){t.vx=t.m*t.vx/(this.m+t.m)+this.m*this.vx/(this.m+t.m),t.vy=t.m*t.vy/(this.m+t.m)+this.m*this.vy/(this.m+t.m),this.reset()},e.prototype.render=function(){this.garden.ctx.beginPath(),this.garden.ctx.arc(this.x,this.y,this.getDiameter(),0,2*Math.PI),this.garden.ctx.fill()},e.prototype.getDiameter=function(){return this.m};var n=window.devicePixelRatio;i.prototype.start=function(){this.playing||(this.playing=!0,this.render(!0))},i.prototype.stop=function(){this.playing&&(this.playing=!1)},i.prototype.resize=function(){this.width=window.innerWidth*n,this.height=window.innerHeight*n,this.area=this.width*this.height,this.nodes.length=Math.sqrt(this.area)/25|0,this.canvas.width=this.width,this.canvas.height=this.height,this.nightMode?this.ctx.fillStyle="#ffffff":this.ctx.fillStyle="#000000";for(var t=0;t<this.nodes.length;t++)this.nodes[t]||(this.nodes[t]=new e(this))},i.prototype.toggleNightMode=function(){this.nightMode=!this.nightMode,this.nightMode?(this.ctx.fillStyle="#ffffff",document.body.classList.add("nightmode")):(this.ctx.fillStyle="#000000",document.body.classList.remove("nightmode"))},i.prototype.render=function(t){var e=this;if(this.playing){t&&requestAnimationFrame(function(){e.render(!0)}),this.ctx.clearRect(0,0,this.width,this.height);for(var i,n,s=0;s<this.nodes.length-1;s++){i=this.nodes[s];for(var h=s+1;h<this.nodes.length;h++){n=this.nodes[h];var o=i.squaredDistanceTo(n),r=3*(i.m*n.m)/o,a=100*r;if(!(.05>a))if(o<=(i.m/2+n.m/2)*(i.m/2+n.m/2))i.m<=n.m?i.collideTo(n):n.collideTo(i);else{var d=i.distanceTo(n),c={x:d.x/d.total,y:d.y/d.total};this.ctx.beginPath(),this.nightMode?this.ctx.strokeStyle="rgba(191,191,191,"+(1>a?a:1)+")":this.ctx.strokeStyle="rgba(63,63,63,"+(1>a?a:1)+")",this.ctx.moveTo(i.x,i.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),i.addForce(r,c),n.addForce(-r,c)}}}for(s=0;s<this.nodes.length;s++)this.nodes[s].render(),this.nodes[s].update()}};var s=window.devicePixelRatio,h=document.getElementById("container"),o=document.getElementsByClassName("moon")[0],r=new i(h);r.start();var a=new Date;(a.getHours()>18||a.getHours()<6)&&r.toggleNightMode();var d=0;h.addEventListener("mousedown",function(t){d++,d>r.nodes.length-1&&(d=1),r.nodes[d].reset({x:t.pageX*s,y:t.pageY*s,vx:0,vy:0})}),o.addEventListener("click",function(){r.toggleNightMode()}),window.addEventListener("resize",function(){r.resize()})}();
