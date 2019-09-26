import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
const { Option } = Select;
const CreateProfile = props => {
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
        linkedIn: '',
        youtube: '',
        instagram: '',

    });

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
        linkedIn,
        youtube,
        instagram,
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const { getFieldDecorator } = this.props.form;
    return (

        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
      </p>
            <small>* = required field</small>

            <div className="OLOCUSTOMBITCH">
                {/*  onChange={e => onChange(e)} */}
                <Form>
                    <Form.Item>
                        <Select defaultValue="0" value={status}>
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
                        <small className="form-text"
                        >Give us an idea of where you are at in your career</small
                        >


                    </Form.Item>

                    <Form.Item>
                        <Input
                            prefix={<Icon type="code" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Company"
                        />
                        <small className="form-text"
                        >Could be your own company or one you work for</small
                        >
                    </Form.Item>

                    <Form.Item>
                        <Input
                            prefix={<Icon type="layout" theme="twoTone" />}
                            placeholder="Website"
                        />
                        <small className="form-text"
                        >Could be your own or a company website</small
                        >
                    </Form.Item>


                    <Form.Item>
                        <Input
                            prefix={<Icon type="build" theme="twoTone" />}
                            placeholder="Location"
                        />
                        <small className="form-text"
                        >City & state suggested (eg. Boston, MA)</small
                        >
                    </Form.Item>

                    <Form.Item>
                        <Input
                            prefix={<Icon type="code" theme="twoTone" />}
                            placeholder="Skills"
                        />
                        <small className="form-text"
                        >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                        >

                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="code" theme="twoTone" />}
                            placeholder="Github"
                        />
                        <small className="form-text"
                        >If you want your latest repos and a Github link, include your
            username</small
                        >
                    </Form.Item>

                    <Form.Item>
                        <Input
                            prefix={<Icon type="code" theme="twoTone" />}
                            placeholder="Bio"
                        />
                        <small className="form-text">Tell us a little about yourself</small>
                    </Form.Item>

                    <div className="my-2">
                        <Button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="dashed">Add Social Network Links</Button>
                        <span style={{ marginLeft: '1em' }}>Optional</span>
                    </div>
                    {displaySocialInputs && <Fragment>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="twitter" />}
                                placeholder="Twitter URL"
                            />

                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="facebook" />}
                                placeholder="Facebook URL"
                            />

                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="youtube" />}
                                placeholder="Youtube URL"
                            />

                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="linkedin" />}
                                placeholder="LinkedIn URL"
                            />

                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="instagram" />}
                                placeholder="Instagram URL"
                            />

                        </Form.Item>
                    </Fragment>}
                </Form>
                <Button type="primary">Submit</Button>
                <Button style={{ marginLeft: '2px' }}>Go Back</Button>
            </div>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
