package io.avengers.ws;

import java.util.List;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.avengers.domain.Team;
import io.avengers.service.TeamService;

@Path("teams")
@Produces(MediaType.APPLICATION_JSON)
public class TeamResource {

	@GET
	public Set<Team> getAllTeams(){
		TeamService hService = new TeamService();
		return hService.findAll();
	}
	
	@GET
	 @Path("{id}")
	public Team getTeamById(@PathParam("id") int id){
		TeamService tService = new TeamService();
		return tService.findTeam(id);
	}
}