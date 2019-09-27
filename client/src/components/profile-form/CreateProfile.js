import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Select, } from 'antd';

const { TextArea } = Input;

function CreateProfile(props) {
    // ANTDESIGN METHODS

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const { getFieldDecorator } = props.form;
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });
    // destructure
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const { Option } = Select;
    return (
        <Fragment>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item label="Status">
                    <small className="form-text">Give us an idea of where you are at in your career</small>

                    {getFieldDecorator('status', {
                        initialValue: '0',
                        rules: [{ required: true, message: 'Required field' }],
                    })(<Select>
                        <Option value="0">* Select Professional Status</Option>
                        <Option value="Developer">Developer</Option>
                        <Option value="Junior Developer">Junior Developer</Option>
                        <Option value="Senior Developer">Senior Developer</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="Student or Learning">Student or Learning</Option>
                        <Option value="Instructor">Instructor or Teacher</Option>
                        <Option value="Intern">Intern</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                    )}
                </Form.Item>
                <small className="form-text">Could be your own company or one you work for</small>
                <Form.Item>
                    {getFieldDecorator('company', {
                        rules: [{ required: true, message: 'Company' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Company"
                        />,
                    )}
                </Form.Item>

                <small className="form-text">Could be your own or a company website</small>
                <Form.Item>
                    {getFieldDecorator('website', {
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Website"
                        />,
                    )}
                </Form.Item>

                <small class="form-text">City & state suggested (eg. Boston, MA)</small >
                <Form.Item>
                    {getFieldDecorator('location', {
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Location"
                        />,
                    )}
                </Form.Item>

                <small class="form-text">Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP)</small>
                <Form.Item>
                    {getFieldDecorator('skills', {
                        rules: [{ required: true, message: 'Enter skills' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Skills"
                        />,
                    )}
                </Form.Item>


                <small class="form-text">If you want your latest repos and a Github link, include your
                username</small>
                <Form.Item>
                    {getFieldDecorator('githubusername', {
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Github Username"
                        />,
                    )}
                </Form.Item>

                <Form.Item>

                    <small>Tell us a little about yourself</small>
                </Form.Item>
                {getFieldDecorator('bio', {
                })(
                    <TextArea
                        placeholder="Enter your bio"
                        autosize={{ minRows: 2, maxRows: 6 }}
                    />
                )}


                <div class="my-2">
                    <Button size="large" onClick={() => toggleSocialInputs(!displaySocialInputs)} style={{ marginRight: '5px' }}>
                        Add Social Network Links
                </Button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <Fragment>
                    <div class="form-group social-input">
                        <i class="fab fa-twitter fa-2x"></i>
                        <Form.Item>
                            {getFieldDecorator('twitter', {
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="twitter url"
                                />,
                            )}
                        </Form.Item>
                    </div>

                    <div class="form-group social-input">
                        <i class="fab fa-facebook fa-2x"></i>
                        <Form.Item>
                            {getFieldDecorator('facebook', {
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="facebook url"
                                />,
                            )}
                        </Form.Item>
                    </div>

                    <div class="form-group social-input">
                        <i class="fab fa-youtube fa-2x"></i>
                        <Form.Item>
                            {getFieldDecorator('youtube', {
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="youtube url"
                                />,
                            )}
                        </Form.Item>
                    </div>

                    <div class="form-group social-input">
                        <i class="fab fa-linkedin fa-2x"></i>
                        <Form.Item>
                            {getFieldDecorator('linkedin', {
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="linkedin url"
                                />,
                            )}
                        </Form.Item>
                    </div>

                    <div class="form-group social-input">
                        <i class="fab fa-instagram fa-2x"></i>
                        <Form.Item>
                            {getFieldDecorator('instagram', {
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="instagram url"
                                />,
                            )}
                        </Form.Item>
                    </div>

                </Fragment>}


                <Button type="primary" style={{ marginRight: '5px' }} htmlType="submit">Submit</Button>
                <Button>Go back</Button>
            </Form>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}
// important to
const CreateProfileForm = Form.create()(CreateProfile);
export default CreateProfileForm
