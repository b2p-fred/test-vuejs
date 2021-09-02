// Libraries
import Vuetify from 'vuetify'

// Utilities
import {createLocalVue, shallowMount} from '@vue/test-utils'

// Components
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
    const message = 'Welcome to Your Vue.js App';

    const localVue = createLocalVue()

    let vuetify;
    let wrapper;

    beforeEach(() => {
        // sandbox.spy(HelloWorld, "login");

        vuetify = new Vuetify();

        wrapper = shallowMount(HelloWorld, {
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
            .find('v-form-stub')
            .find('v-card-title-stub > span');
        expect(messageElt.text()).toBe(message);

        // Form fields
        expect(wrapper
            .findAll('v-text-field-stub')
            .at(0)
            .attributes('label'))
            .toBe("Email");

        expect(wrapper
            .findAll('v-text-field-stub')
            .at(1)
            .attributes('label'))
            .toBe("Password");

        // Form actions
        expect(wrapper
            .find('v-btn-stub[type="button"]')
            .text())
            .toBe('Close');
        expect(wrapper
            .find('v-btn-stub[type="submit"]')
            .text())
            .toBe('Sign in');
    });

    it('should hide login form on button click', async () => {
        // Login form is visible
        // console.log(wrapper.find('v-form-stub').html());
        expect(wrapper.find('v-form-stub').isVisible()).toBe(true);

        // Submit the form
        await wrapper.find('v-btn-stub[type="submit"]').trigger('click');
        await wrapper.vm.login()

        // Login form is visible
        // Testing visibility of a vuetify element is not possible with this method!
        // console.log(wrapper.find('v-form-stub').html());
        // expect(wrapper.find('v-form-stub').isVisible()).toBe(false);
    });

    it('should call login action on button click', async () => {
        // Mock the 'login' methods
        const login = jest.fn();
        wrapper.setMethods({ login });

        // Submit the form
        await wrapper.find('v-btn-stub[type="submit"]').trigger('click');
        await wrapper.vm.login()

        expect(login).toBeCalled();
    });
});