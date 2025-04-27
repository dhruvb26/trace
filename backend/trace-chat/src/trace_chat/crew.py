from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from .tools.supply_chain_tools import get_tools
import os

# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators


@CrewBase
class PatagoniaCrew:
    """Patagonia Supply Chain Management Crew"""

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def patagonia_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["patagonia_agent"],
            tools=get_tools(),
            verbose=True,
            llm=LLM(provider="google", model="gemini-2.5-flash-preview-04-17"),
        )

    @agent
    def supplier_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["supplier_agent"],
            tools=get_tools(),
            verbose=True,
            llm=LLM(provider="google", model="gemini-2.5-flash-preview-04-17"),
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def sustainability_discussion_task(self) -> Task:
        return Task(config=self.tasks_config["sustainability_discussion_task"])

    @task
    def email_follow_up_task(self) -> Task:
        return Task(config=self.tasks_config["email_follow_up_task"])

    @crew
    def crew(self) -> Crew:
        """Creates the Patagonia Supply Chain Management crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=[self.patagonia_agent(), self.supplier_agent()],
            tasks=[self.sustainability_discussion_task(), self.email_follow_up_task()],
            process=Process.sequential,
            verbose=True,
            llm=LLM(provider="google", model="gemini-2.5-flash-preview-04-17"),
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
