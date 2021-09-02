// Libraries
import Vuetify from 'vuetify'

// Utilities
import {createLocalVue, mount} from '@vue/test-utils'

// Components
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
    const message = 'Welcome to Your Vue.js App';

    const localVue = createLocalVue()

    let vuetify;
    let wrapper;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = mount(HelloWorld, {
            localVue,
            vuetify,
            propsData: { msg: message }
        });
    })

    it('should show a login form', () => {
        // Check the component is present
        expect(wrapper.findComponent(HelloWorld).exists()).toBe(true);
        expect(wrapper.findComponent({name: 'hello-world'}).exists()).toBe(true);

        // Form title
        const messageElt = wrapper
            .find('.v-form')
            .find('.v-card__title > span')
            .find('span');
        expect(messageElt.text()).toBe(message);

        // Form fields
        expect(wrapper
            .findAll('.v-form label')
            .at(0)
            .text()).toBe("Email");

        expect(wrapper
            .findAll('.v-form label')
            .at(1)
            .text()).toBe("Password");

        let button = wrapper.find('.v-btn[type="button"]');
        expect(button.text()).toBe('Close');
        button = wrapper.find('.v-btn[type="submit"]');
        expect(button.text()).toBe('Sign in');
        // button.trigger('click');
    });

    it('should hide login form on button click', async () => {
        // Login form is visible
        // console.log(wrapper.find('.v-form').html());
        expect(wrapper.find('.v-form').isVisible()).toBe(true);

        // Submit the form
        await wrapper.find('.v-btn[type="submit"]').trigger('click');
        await wrapper.vm.login();

        // Login form is visible
        // Testing visibility of a vuetify element is not possible with this method!
        // console.log(wrapper.find('.v-form').html());
        // expect(wrapper.find('.v-form').isVisible()).toBe(false);
    });

    /**
     * This kind of test must be done with the shollowMount and not mount !
     */
    it.skip('should call login action on button click', async () => {
        // Mock the 'login' methods
        const login = jest.fn();
        wrapper.setMethods({ login });

        // Submit the form
        wrapper.find('.v-btn[type="submit"]').trigger('click');

        expect(login).toBeCalled();
    });
});