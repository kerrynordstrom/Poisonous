import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"; 
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function ResultCard(props) {
  console.log('props within card', props.poisonSelected);
  const { classes, poisonSelected } = props;
  const symptoms = poisonSelected.symptoms.map((symptom, i) => (
    <li className="list-group-item" key={`${symptom}${i}`}>
      {symptom}
    </li>
  ));
  const poisonousTo = poisonSelected.poisonousTo.map((poisonousTo, i) => (
    <li className="list-group-item" key={`${poisonousTo}${i}`}>{poisonousTo}</li>
  )
  )
  return (
  <div className={classes.root}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
        Poison Name:
        </Typography>
        <Typography variant="headline" component="h2">
        {poisonSelected.poisonName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Level of Toxicity:
        </Typography>
        <Typography variant="headline" component="h2">
          {poisonSelected.levelOfToxicity}
        </Typography>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Poisonous To:</Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{
              display: 'block'
            }}>
            <Typography component="ul" align="center" className="list-group list-group-flush">
              {poisonousTo}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Symptoms</Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{
              display: 'block'
            }}>
            <Typography component="ul" align="center" className="list-group list-group-flush">
                {symptoms}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Descripton</Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{
              display: 'block'
            }}>
            <Typography component="p" variant="body1" paragraph={true}>
              {poisonSelected.description}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CardContent>
    </Card>
  </div>
  );
}

ResultCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultCard);