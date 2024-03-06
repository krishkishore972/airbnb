const joi=require("joi");
module.exports.listschema=joi.object({
    list:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        country:joi.string().required(),
        location:joi.string().required(),
        category:joi.string().required(),
        // image:joi.string().allow("",null),
    }).required()
});

module.exports.reviewschema=joi.object({
    review:joi.object({
        rating:joi.number().required(),
        comment:joi.string().required(),
    }).required()
})

