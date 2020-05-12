module.exports = (app) => {
    const express = require('express');
    const mongoose = require('mongoose');
    const router = express.Router();

    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    const Hero = mongoose.model('Hero');
    const Video = mongoose.model('Video');
    const Ad = mongoose.model('Ad');


    // 初始化新闻数据
    router.get('/news/init', async (req, res) => {
        const newsList = ["五五开黑节，赵云-龙胆即将上架，多重福利来袭", "“五五打卡游”活动开启", "最是一年上星时——《王者荣耀》五五开黑节荣获App Store推荐", "峡谷寻宝第二话——传说史诗皮肤自选寻宝活动开启", "关于微社区熟练度铭文奖励领取活动暂时关闭说明", "最是一年上星时——《王者荣耀》五五开黑节荣获App Store推荐", "王者荣耀×谭盾丨五虎定制交响乐，用传统乐器复原中国声韵", "王者英雄导航来啦!", "新皮肤爆料丨龙战于野，迅疾如风，赵云新装登场！", "跨系统角色转移限量测试开启公告", "5月5日跨系统角色转移测试公告", "5月4日跨系统角色转移测试公告", "五五开黑节，赵云-龙胆即将上架，多重福利来袭", "跨系统角色转移后点亮守护星活动蔷薇之心可重复获取问题说明", "关于微社区熟练度铭文奖励领取活动暂时关闭说明", "五五开黑节，赵云-龙胆即将上架，多重福利来袭", "“五五打卡游”活动开启", "与我为伍，彼此守护，活动专属皮肤&amp;五五局内表现获取全攻略", "峡谷寻宝第二话——传说史诗皮肤自选寻宝活动开启", "神秘商店开启公告", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态", "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜", "关于责成TS俱乐部就欠薪问题进行说明的通知", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌"];
        const parent = await Category.findOne({ name: '新闻资讯' })
        const cats = await Category.find().where({ parent }).lean();
        const list = newsList.map(item => {
            // 随机排列分类列表 
            const randomCats = cats.slice().sort((a, b) => Math.random() - 0.5);
            return {
                title: item,
                categories: randomCats.slice(0, 2)
            }
        })

        await Article.deleteMany({});
        await Article.insertMany(list);
        const ars = await Article.find().populate('categories');
        res.send(ars)
    })
    // 初始化英雄数据
    router.get('/heroes/init', async (req, res) => {
        await Hero.deleteMany({})

        const rawData = [
            {
                "name": "热门",
                "heroes": [
                    { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" },
                    { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
                    { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }]
            },
            {
                "name": "战士",
                "heroes": [
                    { "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }]
            },
            {
                "name": "法师",
                "heroes":
                    [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" },
                    { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }]
            },
            {
                "name": "坦克",
                "heroes":
                    [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" },
                    { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }]
            },
            {
                "name": "刺客",
                "heroes":
                    [{ "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" },
                    { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }]
            },
            {
                "name": "射手",
                "heroes":
                    [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" },
                    { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }]
            },
            {
                "name": "辅助",
                "heroes": [
                    { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }]
            }];

        for (let data of rawData) {
            if (data.name === '热门') {
                continue;
            }
            const category = await Category.findOne({
                name: data.name
            })
            const heroes = data.heroes.map(item => {
                item.categories = [category]
                return item;
            })

            await Hero.insertMany(heroes);
        }

        res.send(await Hero.find());

    })
    // 初始化视频数据
    router.get('/videos/init', async (req, res) => {
        await Video.deleteMany({})

        const rawData1 = [
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/4ca39a0754121380b01a29317301dc5e/0/?width=230&height=140", "title": "小棉花Top5：中单法王北笙参见！这操作让全场高喊666！", "count": "20.0万", "duration": "03:12" },
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/8a09877b815b7cc9c03c96ab7cc30e86/0/?width=230&height=140", "title": "小棉花Top5：据说只有1%的刘备才会这么秀！蛇皮走位秀哭对手！", "count": "40.3万", "duration": "03:15" }, { "icon": "https://shp.qpic.cn/cfwebcap/280828024/adced4c84909f1cd75e68bab32b7259d/0/?width=230&height=140", "title": "小棉花Top5:满屏都是1433223 ！元歌都觉得很赞并点了转发！", "count": "49.7万", "duration": "03:16" },
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/bfd867bf468aca95228d88bdb567bfe2/0/?width=230&height=140", "title": "小棉花Top5：我是最强赵云童子！我觉得我这波天秀！", "count": "26.2万", "duration": "03:09" }, { "icon": "https://shp.qpic.cn/cfwebcap/280828024/15390c1b5c109e0f8dc768c0085e9615/0/?width=230&height=140", "title": "小棉花Top5:别人家雅典娜能当露娜使？这场面一万场也难得一见！", "count": "17.0万", "duration": "04:27" },
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/15e75e26be8a2bc660b7ff3256e7dfd1/0/?width=230&height=140", "title": "小棉花Top5：玄策逆天操作如喝水 ! 告诉你这个英雄为什么非BAN即选！", "count": "8.3万", "duration": "05:02" }, { "icon": "https://shp.qpic.cn/cfwebcap/280828024/3f7bde815cabd9b537a42388f6125e99/0/?width=230&height=140", "title": "小棉花Top5:芈月也能秀成这样？这手速真的是没sei了！", "count": "16.8万", "duration": "03:37" },
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/114ef62edd42d66d06fe18df0672cb65/0/?width=230&height=140", "title": "小棉花Top5：神仙打架！换装互秀！你有7件装备，而我有八件！", "count": "25.3万", "duration": "03:00" }, { "icon": "https://shp.qpic.cn/cfwebcap/280828024/6d4d9eac66de37d1a539bb74a7adfbb2/0/?width=230&height=140", "title": "小棉花Top5：隐身我就抓不到你啦？貂蝉酷炸天盲杀兰陵王！", "count": "16.4万", "duration": "03:10" },
            { "icon": "https://shp.qpic.cn/cfwebcap/280828024/e19a77a428b00d7ade8ea005da4c56fa/0/?width=230&height=140", "title": "小棉花Top5:傲寒月下独舞如影似魅 基地！我知道你看不见那个露娜！", "count": "13.7万", "duration": "03:57" }
        ]
        const rawData2 = [
            { "icon": "https://shp.qpic.cn/cfwebcap/0/c9ecf56735657e76389a27d8a796489d/0/?width=230&height=140", "title": "KPL春季赛 常规赛 成都AG超玩会 vs DYG 第三局", "count": "10.8万", "duration": "39:48" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/c355a351374b0ba1b93c19a1a6b33507/0/?width=230&height=140", "title": "KPL春季赛 常规赛 成都AG超玩会 vs DYG 第二局", "count": "11.3万", "duration": "32:17" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/2da5f1d22a2d8808679c83d722508a00/0/?width=230&height=140", "title": "KPL春季赛 常规赛 成都AG超玩会 vs DYG 第一局", "count": "18.4万", "duration": "45:02" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/c711ec37e1ed74e5f02a2f5d0eaee86b/0/?width=230&height=140", "title": "【精彩集锦】尘夏狂铁灵性绕后斩获双杀，一诺百里玄策极限操作无人可挡豪取三杀", "count": "1.4万", "duration": "02:59" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/527c49baf08d916271984a7d08c57bda/0/?width=230&height=140", "title": "KPL春季赛 常规赛 南京Hero久竞 vs VG 第四局", "count": "1.7万", "duration": "34:04" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/f159e60b95bdbabc16d6c8711d967c0f/0/?width=230&height=140", "title": "KPL春季赛 常规赛 南京Hero久竞 vs VG 第三局", "count": "1.5万", "duration": "37:20" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/4608bece6b01016d6ca640ab76412b8d/0/?width=230&height=140", "title": "KPL春季赛 常规赛 南京Hero久竞 vs VG 第二局", "count": "2.1万", "duration": "39:39" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/4016ec99f4e9936fdf9737e61eaef93e/0/?width=230&height=140", "title": "KPL春季赛 常规赛 南京Hero久竞 vs VG 第一局", "count": "4.2万", "duration": "39:17" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/3313083aae4650e7a8cc77a8191589fe/0/?width=230&height=140", "title": "KPLGT春季赛 季后赛选拔赛 ESG vs BL 第四局", "count": "575", "duration": "19:16" },
            { "icon": "https://shp.qpic.cn/cfwebcap/0/9d9c0d7af108eb940d28187ed6b20542/0/?width=230&height=140", "title": "KPLGT春季赛 季后赛选拔赛 ESG vs BL 第三局", "count": "289", "duration": "17:29" },
        ]

        const category1 = await Category.findOne({
            name: '精彩视频'
        })
        const category2 = await Category.findOne({
            name: '赛事精品'
        })

        rawData1.forEach(item => {
            item.categories = [category1];
        })
        rawData2.forEach(item => {
            item.categories = [category2];
        })

        const data = [...rawData1, ...rawData2];

        await Video.insertMany(data);

        res.send(await Video.find());

    })

    // 获取新闻列表
    router.get('/news/list', async (req, res) => {
        // const parents = await Category.findOne({
        //     name: '新闻资讯'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean();

        const parent = await Category.findOne({ name: '新闻分类' });
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',  // 内键：Schema的内键
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        const catIds = cats.map(item => item._id);
        cats.unshift({
            name: '热门',
            newsList: await Article.find({
                categories: { $in: catIds }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name == '热门' ? news.categories[0].name : cat.name;
            })
        })

        res.send(cats);
    })
    // 获取英雄列表
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({ name: '英雄分类' });
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',  // 内键：Schema的内键
                    foreignField: 'categories',
                    as: 'heroesList'
                }
            }
        ])

        const catIds = cats.map(item => item._id);
        cats.unshift({
            name: '热门',
            heroesList: await Hero.find({
                categories: { $in: catIds }
            }).limit(10).lean()
        })
        res.send(cats);
    })
    // 获取英雄详情
    router.get('/heroes/:id', async (req, res) => {
        let data = await Hero.findById(req.params.id)
            .populate('categories')
            .populate('items1')
            .populate('items2')
            .lean();
        res.send(data);
    })
    // 文章详情
    router.get('/article/:id', async (req, res) => {
        let data = await Article.findById(req.params.id).lean();
        data.related = await Article.find().where({
            categories: { $in: data.categories },
            title: { $ne: data.title }
        }).limit(2)

        res.send(data);
    })
    // 获取视频列表
    router.get('/videos/list', async (req, res) => {
        const { pageNum = 1, name } = req.query;
        let cats = null;
        if (!name) {
            const parent = await Category.findOne({ name: '视频分类' });
            cats = await Category.aggregate([
                { $match: { parent: parent._id } },
                {
                    $lookup: {
                        from: 'videos',
                        localField: '_id',  // 内键：Schema的内键
                        foreignField: 'categories',
                        as: 'videosList'
                    }
                },
                {
                    $addFields: {
                        'videosList': { $slice: ['$videosList', 3] }
                    }
                }
            ])


        } else {
            cats = await Category.findOne({ name })
                .populate({ path: 'videosList', limit: 3, skip: (Number(pageNum) - 1) * 3, })
                .lean();
        }
        res.send(cats);
    })
    // 获取某个视频
    router.get('/videos/:id', async (req, res) => {
        let data = await Video.findById(req.params.id)
            .populate('categories')
            .lean();
        data.related = await Video.find().where({
            categories: { $in: data.categories },
            title: { $ne: data.title }
        }).limit(6)
        res.send(data);
    })
    // 获取首页幻灯片
    router.get('/ads/home-slide', async (req, res) => {
        let data = await Ad.findOne({
            name: '首页幻灯片广告'
        })
        res.send(data)
    })




    app.use('/web', router);
}