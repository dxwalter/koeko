import html2canvas from 'html2canvas';

export default ({app}, inject) => {

    let getBusinessLogoUrl = (businessId, logoPath) => {

        let extension = logoPath.split('.');

        if (extension[1] != 'jpg') {
            logoPath = `${extension[0]}.jpeg`
        }

        return `https://res.cloudinary.com/cudua-images/image/upload/ar_1:1,c_fill,g_auto,o_100,r_max,w_200,f_auto/v1598971119/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/logo/${logoPath}`
    }

    inject("getBusinessLogoUrl", getBusinessLogoUrl);


    let getBusinessCoverPhotoUrl = (businessId, coverPath) => {

        let extension = coverPath.split('.');

        if (extension[1] != 'jpg') {
            coverPath = `${extension[0]}.jpeg`
        }

        return `https://res.cloudinary.com/cudua-images/image/upload/w_500,ar_16:9,c_fill,g_auto,e_sharpen,f_auto/v1598985984/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/cover/${coverPath}`
    }

    inject("getBusinessCoverPhotoUrl", getBusinessCoverPhotoUrl);

    let formatProductImageUrl = (businessId, imagePath, type) => {
        let extension = imagePath.split('.');

        if (extension[1] != 'jpg') {
            imagePath = `${extension[0]}.jpeg`
        }
        if (type == "thumbnail") {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1599134339/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/product/${imagePath}`
        }

        if (type == 'iconSize') {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_50,f_auto,q_auto/v1599134339/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/product/${imagePath}`
        }

        if (type == 'medium') {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1599134339/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/product/${imagePath}`
        }

        if (type == 'bigSize') {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1599134339/${process.env.CLOUDINARY_FOLDER}/business/${businessId}/product/${imagePath}`
        }
    }

    inject("formatProductImageUrl", formatProductImageUrl)

    let getCustomerProfilePictureUrl = (customerId, dpPath) => {

        let extension = dpPath.split('.');

        if (extension[1] != 'jpg') {
            dpPath = `${extension[0]}.jpeg`
        }

        return `https://res.cloudinary.com/cudua-images/image/upload/ar_1:1,c_fill,g_auto,o_100,r_max,w_200,f_auto/v1598971119/${process.env.CLOUDINARY_FOLDER}/customer/${customerId}/profilePicture/${dpPath}`
    }

    inject("getCustomerProfilePictureUrl", getCustomerProfilePictureUrl);

    let htmlToCanvas =  async (el, options = {}) => {
        const { type } = options;
        const canvas = await html2canvas(el, options);
        if (type && type === 'dataURL') { return canvas.toDataURL(); } else {
          console.warn('Vue Html2Canvas Warn: Invalid option type. Use \'dataURL\' instead. Returning canvas.');
          return canvas;
        }
    }

    inject("htmlToCanvas", htmlToCanvas);

}
