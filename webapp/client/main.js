import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function onCreated() {
  this.pid = new ReactiveVar(null);
})


Template.hello.helpers({
  pid() {
    return Template.instance().pid.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    Meteor.call('microservice.test', (err, data) => {
      instance.pid.set(data);
    });
  },
});
