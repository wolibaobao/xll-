<template>
    <div class="bj animated fadeIn">

       
	
        <div class="ty2" id="ty2">
			<div class="ty"></div>
			<span></span>
		</div>
		<div class="box animated zoomIn" id="kuai">
			<img src="../assets/ewm.jpg" alt="">
		</div>

    </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  mounted: function() {
    var _this = document.getElementById("kuai");
    var oDiv = document.getElementById("ty2");
    document.onmousemove = function(e) {
      var ev = e || event;

      var Y = ev.clientY / innerHeight;
      var X = ev.clientX / innerWidth;

      var Y2 = ev.clientY;
      var X2 = ev.clientX;

      // console.log(X2, Y2);
      if(X2<=1750){
           oDiv.style.left = X2 + "px";
      oDiv.style.top = Y2 + "px";
      _this.style.boxShadow =
        "" + (60 + -120 * X) + "px " + (60 + -120 * Y) + "px 40px rgba(255, 255, 255, 0.49)";
      }
     
    };
  }
};
</script>


<style>


.bj {
  overflow: hidden;
  /* background: url("../assets/sky.jpg"); */
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  margin-top: -2px;
}

.box {
  width: 350px;
  height: 450px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border: #000000 solid 1px;
  /* box-shadow: -30px 0 40px black; */
}
.box img {
  width: 100%;
  height: 100%;
}
.ty2 {
  width: 150px;
  height: 150px;
  /* background:url('../assets/yl.png'); */
background-size: contain;
  text-align: center;
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
}
.ty {
  width: 150px;
  height: 150px;
  /* background: yellow; */

  text-align: center;
  filter: blur(60px);
  overflow: hidden;
  border-radius: 50%;
}
.ty2 span {
  width: 150px;
  height: 150px;
  color: #333;
  z-index: 999;
  position: absolute;
  top: 0;
  display: block;
  line-height: 150px;
}
</style>
