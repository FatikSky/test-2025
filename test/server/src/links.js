const express = require('express');

const router = express.Router();

let links = [
    {
        "id": 1,
        "title": "About at nicatmanafov.com",
        "icon": "https://uploads.relink.is/usercontent/Li14EOYXEM.webp",
        "url": "https://nicatmanafov.com/"
    },
    {
        "id": 2,
        "title": "I am on Linkedin",
        "icon": "https://uploads.relink.is/usercontent/LinkedIn_logo_initials_b_Wy1xyz.png",
        "url": "https://www.linkedin.com/in/nicatmanafov/"
    },
    {
        "id": 3,
        "title": "Posting jokes on Facebook",
        "icon": "https://uploads.relink.is/usercontent/584ac2d03ac3a570f94a666d_vQiHcfbA.png",
        "url": "https://www.facebook.com/nicatmanaf"
    },
    {
        "id": 4,
        "title": "Daily life at Instagram",
        "icon": "https://uploads.relink.is/usercontent/m3PyUsGZtW.webp",
        "url": "https://www.instagram.com/nicatmanaf"
    },
    {
        "id": 5,
        "title": "Posting nothing on X",
        "icon": "https://uploads.relink.is/usercontent/bG1q7tnxqL.webp",
        "url": "https://x.com/nicatmanafov"
    }
];

router.get("/", (req, res) => {
    res.json(links);
});

router.post('/', (req, res) => {
    let link = {
        id: links.length + 1,
        title: req.body.title,
        icon: req.body.icon,
        url: req.body.url,
    };
    links.push(link);
    res.send('Link successfully added.');
});

router.put("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    let link = links.find((item) => item.id === id);
    if(link === undefined){
        next(new Error('Wrong id!'));
    }
    else{
        link = {
            id: id,
            title: req.body.title,
            icon: req.body.icon,
            url: req.body.url,
        };
        links.splice(links.findIndex((item) => item.id === id), 1, link);
        res.json(link);
    }
});

router.delete("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    let link = links.find((item) => item.id === id);
    if(link === undefined){
        next(new Error('Wrong id!'));
    }
    else{
        links.splice(links.findIndex((item) => item.id === id), 1);
        res.send('Link successfully deleted.');
    }
});

router.use((err, req, res, next) => {
    console.error(err.message);
    res.status(404).send('No links with entered data.');
});

router.route;

module.exports = router;