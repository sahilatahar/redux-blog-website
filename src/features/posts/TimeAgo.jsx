import { parseISO, formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

const TimeAgo = ({ timestamp }) => {

    if (timestamp) {
        const timeAgo = formatDistanceToNow(parseISO(timestamp), { addSuffix: true })
        return <span>{timeAgo}</span>
    }

    return (
        <span>Long time ago</span>
    )
}

TimeAgo.propTypes = {
    timestamp: PropTypes.string
}

export default TimeAgo