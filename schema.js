const joi=require("joi");
module.exports.listschema=joi.object({
    list:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        country:joi.string().required(),
        location:joi.string().required()
    }).required()
});

