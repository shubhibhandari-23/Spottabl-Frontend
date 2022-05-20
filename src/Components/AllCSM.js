import { Box, Avatar, Divider, IconButton } from '@mui/material';
import { Person, Circle, Delete } from '@mui/icons-material'
import { purple } from '@mui/material/colors'

function getFirstLetters(str) {
    const firstLetters = str
        .split(' ')
        .map(word => word[0])
        .join('');

    return firstLetters;
}

const delCSM = (st, id) => {
    localStorage.setItem(
        "allCSM",
        JSON.stringify(
            JSON.parse(
                localStorage.getItem("allCSM")
            ).filter(ob => ob.id != id)
        )
    )
    st(JSON.parse(localStorage.getItem('allCSM')));
}

const CSMBox = (props) => {
    return (
        <Box className='tw-px-8 tw-py-2 tw-flex'>
            <div className='tw-flex tw-flex-row tw-items-center tw-w-full'>
                <div className='tw-flex tw-flex-row tw-grow tw-items-center tw-py-2'>
                    <div className='tw-flex tw-items-center tw-justify-center'>
                        <Avatar sx={{ bgcolor: purple[400], width: 48, height: 48 }}>{getFirstLetters(props.name).substring(0, 2)}</Avatar>
                    </div>
                    <div className='crmdata-obj tw-flex tw-flex-col tw-justify-center tw-px-8'>
                        <h5 className='tw-text-lg tw-font-bold'>{props.name}</h5>
                        <div className='tw-flex tw-flex-row tw-text-md'>
                            <Person></Person>
                            <div>{props.role.map((r, i) => (i === props.role.length - 1) ? r : `${r} - `)}</div>
                            {(props.email.length) ? <div className='tw-px-4'><Circle sx={{ width: 6, height: 6 }}></Circle> {props.email}</div> : null}
                        </div>
                    </div>
                </div>
                <IconButton onClick={() => delCSM(props.setCSM, props.id)} >
                    <Delete />
                </IconButton>
            </div>
            <Divider />
        </Box>
    )
}

const AllCSM  = (props) => {
    console.log(props.csms);
    let csmData
    if(props.csms.length) {
        csmData = props.csms.map(csm => <CSMBox key={csm.id} id={csm.id} name={csm.name} role={csm.role} email={csm.email} setCSM={props.setCSM} />)
    }
    else {
        return;
    }

    return (
        <div className='tw-border-2 md:tw-max-h-80 md:tw-overflow-y-auto'>
            {csmData}
        </div>
    )
}

export default AllCSM;