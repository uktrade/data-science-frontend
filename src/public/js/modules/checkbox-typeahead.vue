<template>
    <div class="govuk-form-group js-prevent-submit"
         v-model="selectedOptions"
    >
        <div class=" app-filter-group-heading">
            <label class="govuk-label govuk-!-font-weight-bold app-filter-label">
                {{ filterTitle }}
            </label>

            <div class="govuk-form-group">
                <label class="govuk-label app-filter-subheading">
                    Search for country
                </label>
                <input class="govuk-input" type="text" v-on:keyup.prevent="getQuery">
            </div>
        </div>

        <div class="app-filter-group-list">
            <div class="govuk-form-group">
                <div class="govuk-checkboxes app-filter-checkboxes-group">
                    <div v-for="item, index in list" class="govuk-checkboxes__item">
                        <input :id="'market-exported-to-' + item" name="market-exported-to"
                               type="checkbox"
                               :value="item.value"
                               :checked="item.checked"
                               class="govuk-checkboxes__input"
                               v-model="selectedOptions"
                               v-on:click.prevent="asyncFilter">
                        <label :for="'market-exported-to-' + item"
                               class="govuk-label govuk-checkboxes__label"
                        >{{item.text}}</label>
                    </div>
                </div>
            </div>
        </div>
        <input class="" :value="selectedOptions">
    </div>
</template>
<script>
  import VueTypeahead from 'vue-typeahead'
  import { filter, map, pickBy } from 'lodash'

  const XHR = require('../lib/xhr')
  const getFormData = require('get-form-data').default

  function filterCountries(query, countries) {
    return countries.filter((country) => {

      const countryName = country.text
      const regex = new RegExp(query.replace(/\s\s+/g, ' '), 'i');

      return countryName.match(regex);
    });
  }

  export default {

    extends: VueTypeahead,
    name: 'checkbox-typeahead',

    created() {
      this.$http.get(`/${this.filterName}${window.location.search}`).then(function(response){
        this.initialList = response.data
        this.list = this.initialList
        this.selectedOptions = map(filter(this.list, (item) => item.checked), (item) => item.value)
      }.bind(this))
    },

    props: {
      filterName: {
        type: String,
        required: true,
      },
      filterTitle: {
        type: String,
        required: true,
      }
    },

    data : function() {
      return {
        selectedOptions: [],
        list: this.intialList,
        query: ''
      }
    },

    watch: {

    },

    methods: {
      // selectedOptionsZ: function (newOptions) {
      //   if (!this.autoSubmit || this.isSubmitting) { return }
      //   this.isSubmitting = true
      //
      //   const form = this.formSelector ? document.querySelector(this.formSelector) : this.$el.closest('form')
      //   if (!form) { return }
      //
      //   const query = pickBy(getFormData(form))
      //   delete query[this.id]
      //   query[this.name] = newOptions.map(option => option.value)
      //
      //   XHR.request(form.action, query)
      //     .then(() => {
      //       this.isSubmitting = false
      //     })
      // },

      getQuery(item) {
        const query = item.target.value

        console.log(this.filterName)

        if (query.length >= 3) {
          this.list = filterCountries(query, this.initialList)
        } else {
          this.list = this.initialList
        }
      },

      asyncFilter(item) {
        const value = item.target.value

        map(this.list, (country) => {
          if(country.value === value) {
            country.checked = !country.checked
            console.log(country.value, country.checked)
          }
        })

        if (this.selectedOptions.indexOf(value) === -1) {
          this.selectedOptions.push(value)
        } else {
          this.selectedOptions.pop(value)
        }

        const form = this.formSelector ? document.querySelector(this.formSelector) : this.$el.closest('form')
        if (!form) { return }

        const query = pickBy(getFormData(form))
        delete query[this.id]
        // query[this.name] = item.map(option => option.value)

        console.log('>>>>>> query >>>>>>', query)
        XHR.request(form.action, query)
          .then(() => {
            this.isSubmitting = false
          })
      },
    },
  }
</script>