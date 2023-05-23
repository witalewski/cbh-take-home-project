# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### TASK-1 Add the capability for storing custom ids to the database.

Create a CustomAgentId table in the database, with the following fields:
- agent_id (foreign key)
- facility_id (foreign key)
- custom_agent_id (string, not null)

Create indices to ensure that the following pairs are always unique:
- agent_id and facility_id (each Facility can only have a single custom id for each Agent)
- facility_id and custom_agent_id (Facilities can't reuse the same custom id for multiple Agents)

It should be possible for 2 different Facilities to either both use the same id for the same agent or each have their own id for the same agent.

E.g. these should be allowed:

| agent_id | facility_id | custom_agent_id |
|----------|-------------|-----------------|
|        1 |    Clinic A |            Alex |
|        1 |  Hospital B |               1 |
|        2 |    Clinic A |           Bruce |
|        2 |  Hospital B |            Alex |
|        3 |    Clinic A |             May |
|        3 |  Hospital B |               2 |

But then it shouldn't be possible to add any of the following:

| agent_id | facility_id | custom_agent_id |
|----------|-------------|-----------------|
|        1 |    Clinic A |            Anna |
|        4 |    Clinic A |             May |

This task has no dependencies.


### TASK-2 Include custom ids in the retrieved data

Update the return type of the `getShiftsByFacility` function to include custom agent id

Depends on: TASK-1

### TASK-3 Use custom ids in the reports

Modify the `generateReport` function so that the reports show the Facility's custom ids for each Agent instead of the internal ID from out database.

When a custom id is not available, use the internal id as a fallback. (**Note:** confirm this requirement.)

Depends on: TASK-1, TASK-2

### TASK-4

Add a capability in the Facility's administration panel to assign custom ids to Agents.

Once assigned, the ids cannot be changed. (**Note:** If a Facility needs to change a mistakenly assigned id, it may be safer to do the change manually on their request rather than allowing them to modify the records through a UI. If a Facility needs to change ids frequently due to external requirements, we can consider adding a capability to modify th IDs via the administration panel and allow or block it on per-Facility basis)

Depends on: TASK-1