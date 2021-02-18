import Vue from 'vue';
import Notifications from 'vue-notification'
import velocity from 'velocity-animate';

Vue.use(Notifications, { velocity })

export default ({app}, inject) => {

    let showNotification = (dataObject) => {
        
        Vue.notify({
            group: 'All',
            position: 'top right',
            type: dataObject.type,
            title: dataObject.title,
            text: dataObject.text,
            duration: -1,
            speed: 300,
            duration: 3000,
            animation: {enter: {opacity: [1, 0]}, leave: {opacity: [0, 1]}}
        })
    }

    inject("showNotification", showNotification);



    let initiateNotification = (type, title, text) => {
        app.$showNotification({
            type: type,
            title: title,
            text: text
        })
    }

    inject("initiateNotification", initiateNotification);

    

    let showToast = (message, type, time = 1500) => {
        let options = {
            position: 'bottom-center',
            duration: 10000,
            keepOnHover: true,
            type: type
        }
        app.$toast.show(message, options).goAway(time)
    }

    inject("showToast", showToast);

    let businessNotificationTitle = (type, title) => {
        type = type.toLowerCase().trim();
        let header;
        switch (type) {
            case "follow":
                header = title;
                break;

            case "order":
                header = title;
                break;

            case "business_profile":
                header = title;
                break;

            case "businessreview":
                header = title;
                break;

            case "product_review":
                header = title;
                break;

            case "subscription":
                header = title;
                break;

            case "invite":
                header = title;
                break;
        
            default:
                header = "New notification"
        }

        return header
    }

    inject('businessNotificationTitle', businessNotificationTitle);


    let customerNotificationTitle = (type) => {
        type = type.toLowerCase().trim();
        let header;
        switch (type) {
            case "follow":
                header = "New Follower";
                break;

            case "order":
                header = "Order";
                break;

            case "customer_profile":
                header = "Profile";
                break;

            case "customerreview":
                header = "Review";
                break;
        
            default:
                header = "Notification"
        }

        return header
    }

    inject('customerNotificationTitle', customerNotificationTitle);

    let businessNotificationLink = (type, id) => {

            type = type.toLowerCase();
			let url;
			switch (type) {
				case "follow":
					url = "/b/followers";
					break;

				case "order":
					url = `/b/orders/${id}`;
					break;

				case "business_profile":
					url = "/b/profile/";
                    break;
                    
                case "businessreview":
                    url = "/b/profile/?newReview";
                    break;
                    
                case "product_review":
                    url = `/b/product/${id}`;
                    break;

                case "subscription":
                    url = "/b/profile/edit?billing=true";
                    break;

                case "invite":
                    url = "/b/invite"
                    break
			
				default:
					url = "#"
			}

			return url
    }

    inject('businessNotificationLink', businessNotificationLink)

    let customerNotificationLink = (type, id) => {
            
            type = type.toLowerCase();
			let url;
			switch (type) {

				case "order":
					url = `/c/orders/${id}`;
					break;

				case "payment":
					url = `/c/orders/${id}`;
					break;

				case "customer_profile":
					url = "/c/profile/";
                    break;
                    
                case "customerreview":
                    url = "/c/profile/?newReview=true";
                    break;
			
				default:
					url = "#"
			}

			return url
    }

    inject('customerNotificationLink', customerNotificationLink)
}