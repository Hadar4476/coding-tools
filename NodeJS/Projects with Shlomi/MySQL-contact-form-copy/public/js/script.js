$.validator.addMethod(
  "regex",
  (value, element, regexp) => {
    // console.log(regexp);
    // console.log(value);
    // console.log(element);
    return new RegExp(regexp).test(value);
  },
  "A Valid Phone Number Is Required"
);

$("#contact-form").validate({
  rules: {
    fullname_field: {
      required: true,
      minlength: 3,
      maxlength: 70,
    },
    email_field: {
      required: true,
      email: true,
    },
    phone_field: {
      required: true,
      regex: /^0[0-9]\d{7,8}$/,
    },
  },
});
