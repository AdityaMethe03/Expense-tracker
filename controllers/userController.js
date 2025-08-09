const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');


// const filterObj = (obj, ...blockedFields) => {
//     const newObj = {};
//     Object.keys(obj).forEach(el => {
//         if (!blockedFields.includes(el)) {
//             newObj[el] = obj[el];
//         }
//     });
//     return newObj
// }

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    // console.log(req.file);
    console.log(req.body);

    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updatePassword.', 400));
    }

    if (req.body.name || req.body.email) {
        return next(new AppError('You cannot change name or email.', 400));
    }

    // if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });

    //User.findById 
    //here we cannot use this because it will trigger validator in passwordConfirm

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Please use /signup instead'
    })
}

//Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.sendReactivationLink = catchAsync(async (req, res, next) => {
    const query = User.findOne({ email: req.body.email, active: false }).select('+active');
    query._skipActiveFilter = true;
    const user = await query;

    console.log(user);

    if (!user) {
        return next(new AppError('No inactive user found with this email.', 404));
    }

    const token = user.createReactivationToken();
    await user.save({ validateBeforeSave: false });

    const reactivationURL = `${req.protocol}://${req.get('host')}/api/v1/users/reactivate/${token}`;

    const message = `Click this link to reactivate your account:\n\n${reactivationURL}\n\nIf you didn't request this, ignore this email.`;

    // await sendEmail({
    //   email: user.email,
    //   subject: 'Reactivate your account',
    //   message
    // });

    res.status(200).json({
        status: 'success',
        token: token,
        message: `Reactivation link sent to your email. ${message}`
    });
});

exports.reactivateUser = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const query = User.findOne({
        reactivationToken: hashedToken,
        reactivationTokenExpires: { $gt: Date.now() },
        active: false
    }).select('+reactivationToken +reactivationTokenExpires +active');

    query._skipActiveFilter = true;
    const user = await query;

    if (!user) {
        return next(new AppError('Token is invalid or expired.', 400));
    }

    user.active = true;
    user.reactivatedAt = Date.now();
    user.reactivationToken = undefined;
    user.reactivationTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Account successfully reactivated'
    });
});
