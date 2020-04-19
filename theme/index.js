// import dark from './dark'
import images from '../static/images'
export default {
    dark: {
        fontSize: {
            font10: '10px',
            font14: '14px',
            font16: '16px',
            font18: '18px',
            font20: '20px',
        },
        fontWight: {
            light: 400,
            normal: 600,
            bold: 700,
        },
        colors: {
            fontColor1: '#999999',
            fontColor2: '#F25A02',
            fontColor3: '#FFFFFF',
            fontColor4: '#7A7A7A',
            fontColor5: '#7e7e7e',
            fontColor6: '#000000',

            backgroundColor1: 'rgba(0,0,0,0.8)',
            backgroundColor2: '#151515',
            backgroundColor3: '#111111',
            backgroundColor4: '#3D3D3D',
            backgroundColor5: '#050505',
            backgroundColor6: '#191919',
            backgroundColor7: '#ffffff',

            borderColor1: '#464646',
            borderColor2: '#F25A02',
        },
        images: {
            ...images,
        },
    },
}
