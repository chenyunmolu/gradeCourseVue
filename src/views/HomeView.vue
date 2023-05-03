<template>
  <div>
    <el-container>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://img2.chinadaily.com.cn/images/202304/21/64423090a310b60580cb9f06.jpeg"
              class="d-block w-100 h-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>我国一季度吸收外资实现“开门稳”</h5>
              <p>
                商务部4月20日表示，今年1-3月，全国实际使用外资4084.5亿元人民币，同比增长4.9%。吸收外资实现了“开门稳”。
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://cds.chinadaily.com.cn/dams/capital/image/202304/27/6449de00e4b030573a5d4770.jpg"
              class="d-block w-100 h-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>“五一”旅游市场预订火爆 将迎出行高峰</h5>
              <p>
                “五一”假期临近，不少消费者正在筹备出游。各大旅游平台发布的数据显示，今年“五一”假期，国内旅游需求增长显著。
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://img2.chinadaily.com.cn/images/202304/26/64489366a310b60580cbe831.jpeg"
              class="d-block w-100 h-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>物价飙升致纽约半数家庭“入不敷出”</h5>
              <p>
                美国非营利组织纽约市基金会和纽约市联合之路4月25日联合发布的纽约真实生活成本报告显示，纽约市有劳动适龄人口的半数家庭无力负担基本生活开支,该数字较2021年增长14%，创下这项调查23年来的历史最高纪录。报告称，失业和生活成本飙升，特别是房价和育儿费用上涨，是导致纽约市越来越多家庭“入不敷出”的主要原因。
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://cds.chinadaily.com.cn/dams/capital/image/202304/25/644748dce4b030573a5d1bdd.jpg"
              class="d-block w-100 h-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>一季度新增就业297万人 形势逐步恢复</h5>
              <p>
                一季度，稳经济政策效果持续显现，有力支撑就业形势逐步恢复。城镇新增就业297万人，同比增加12万人，就业市场活跃度逐步提升。
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style>
.beauty {
  font-family: "宋体";
  font-size: 2em;
  color: blueviolet;
}
.carousel-item {
  height: 690px;
  width: 1330px;
}
</style>