import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, CheckboxRadio } from "../../components/FormElements";

function LandlordSignUp() {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: 'onTouched' })
    const navigate = useNavigate()
    const onSubmit = (data) => {
        const { name, email, password, tel, gender,agree } = data;
        console.log(data);
        navigate('/')
    }
    return (
        <div className='bg-light pt-5 pb-7 full-height'>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <Input
                            id='name'
                            labelText='姓名'
                            type='text'
                            placeholder='請輸入姓名'
                            errors={errors}
                            register={register}
                            rules={{
                                required: '姓名為必填',
                            }}
                        ></Input>
                    </div>

                    <div className="mb-3">
                        <Input
                            id='email'
                            labelText='Email'
                            type='email'
                            placeholder='sample@mail.com'
                            errors={errors}
                            register={register}
                            rules={{
                                required: 'Email 為必填',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Email 格式不正確',
                                },
                            }}
                        ></Input>
                    </div>

                    <div className="mb-3">
                        <Input
                            id='password'
                            labelText='密碼'
                            type='password'
                            placeholder='6-18位數密碼'
                            errors={errors}
                            register={register}
                            rules={{
                                required: '密碼為必填',
                                minLength: {
                                    value: 6,
                                    message: '密碼不少於 6 碼'
                                },
                                maxLength: {
                                    value: 12,
                                    message: '密碼不超過 12 碼'
                                }
                            }}
                        ></Input>
                    </div>

                    <div className="mb-3">
                        <Input
                            id='checkPassword'
                            labelText='確認密碼'
                            type='password'
                            placeholder='6-18位數密碼'
                            errors={errors}
                            register={register}
                            rules={{
                                required: '確認密碼為必填',
                                validate: (match) => {
                                    const password = getValues('password');
                                    return match === password || '與密碼不符合'
                                }
                            }}
                        ></Input>
                    </div>

                    <div className="mb-3">
                        <Input
                            id='tel'
                            labelText='手機號碼'
                            type='tel'
                            errors={errors}
                            register={register}
                            placeholder='10位數手機號碼'
                            rules={{
                                required: '手機號碼為必填',
                                minLength: {
                                    value: 10,
                                    message: '手機號碼不少於 10 碼'
                                },
                                maxLength: {
                                    value: 10,
                                    message: '電話不超過 10 碼'
                                }
                            }}
                        ></Input>
                    </div>

                    <div className="mb-3">
                        <div className='form-label'>性別</div>
                        <div className="d-flex">
                            <CheckboxRadio
                                id='male'
                                name='gender'
                                labelText='男'
                                type='radio'
                                value='male'
                                errors={errors}
                                register={register}
                                rules={{
                                    required: '請選擇性別',
                                }}
                            ></CheckboxRadio>
                            <CheckboxRadio
                                id='female'
                                name='gender'
                                labelText='女'
                                type='radio'
                                value='female'
                                errors={errors}
                                register={register}
                                rules={{
                                    required: '請選擇性別',
                                }}
                            ></CheckboxRadio>
                        </div>
                    </div>

                    <div className="mb-3">
                        <CheckboxRadio
                            id='agree'
                            name='agree'
                            labelText={<p className="text-break">
                                我已仔細閱讀並明瞭「<button type="button" className="btn text-primary" style={{textDecoration:'underLine'}}>服務條款</button>」、
                                「<button type="button" className="btn text-primary" style={{textDecoration:'underLine'}}>免責聲明</button>」、
                                「<button type="button" className="btn text-primary" style={{textDecoration:'underLine'}}>隱私權聲明</button>」
                                等所載內容及其意義，茲同意該等條款規定，並願遵守網站現今、嗣後規範的各種規則
                            </p>}
                            type='checkbox'
                            value='true'
                            errors={errors}
                            register={register}
                            rules={{
                                required: '請勾選同意聲明',
                            }}
                        ></CheckboxRadio>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='submit'className='btn btn-primary py-3 px-7 rounded'>
                            註冊
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default LandlordSignUp