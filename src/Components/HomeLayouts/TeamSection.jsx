import React from 'react'
import useTrainers from '../../Hooks/useTrainers'
import Loading from '../Pages/Loading'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const TeamSection = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const axiosPublic = useAxiosPublic()
    const { user, loading } = useAuth()
    // console.log(loading)
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainer', user?.email],
        // enabled: !loading && !!user?.email && !localStorage.getItem('access-token'),
        queryFn: async () => {
            const { data } = await axiosPublic(`/users/all-trainers/role?role=trainer`)
            return data
        }
    })

    console.log(trainers)
    const topThreeTrainers = trainers.slice(0, 3)
    console.log(topThreeTrainers)
    if (isLoading || loading) return <Loading />





    // const [trainers, isLoading] = useTrainers()
    return (
        <div className=' max-w-[80vw] mx-auto pl-8 my-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center'>
            {/* <h1>TeamSection(Pending)</h1>
            <p>Display at least three trainer profiles, each accompanied by key information. Each profile should include the trainer's name, a brief biography, areas of expertise, and a professional photo.</p> */}



            {topThreeTrainers.map(threeCard =>
                <Card sx={{ maxWidth: 345 }} className='' key={threeCard._id}>
                    <CardHeader
                        title={threeCard?.name}
                        subheader={threeCard?.email}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={threeCard?.photo}
                        alt={threeCard?.name}
                        className='h-[200px]'
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {threeCard.availableDays.flatMap(day => day.value).join(', ')}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography sx={{ marginBottom: 2 }} className='underline'>About Me:</Typography>
                            <Typography sx={{ marginBottom: 2 }}>
                                <h1><span className='underline'>Experience:</span>  <span className='font-bold'>{threeCard.experience.flatMap(exp => exp.value)} Years</span></h1>

                            </Typography>
                            <Typography sx={{ marginBottom: 2 }}>
                                <h1 className='underline'>Skills: </h1>
                                {/* <p>{threeCard.skills.flatMap(skill=> skill.value)} Years</p> */}
                                <p className='font-bold'>{threeCard.skills.map(skill => skill).join(', ')}</p>
                            </Typography>
                            <Typography sx={{ marginBottom: 2 }}>
                                {threeCard.otherInfo}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            )}
        </div>
    )
}

export default TeamSection
