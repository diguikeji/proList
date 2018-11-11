var Fly = require("flyio/dist/npm/wx")
var request = new Fly();

//网络超时时间
request.config.timeout = 60 * 1000
request.config.baseURL = 'https://wxsgyh.cnderui.com'

request.isShowLoading = true;

request.interceptors.request.use((request) => {
    if (request.isShowLoading) {
        wx.showLoading({ title: '拼命加载中...' })
    }

    return request
})

request.interceptors.response.use(
    (response, promise) => {
        wx.hideLoading();
        request.isShowLoading = true;
        return promise.resolve(response.data)

    },
    (err, promise) => {
        wx.hideLoading();
        request.isShowLoading = true;
        wx.showToast({
            title: "网络不好，请检查网络",
            icon: 'none'
        })
        return promise.reject()
    }
)

export default request